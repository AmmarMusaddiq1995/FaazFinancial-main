"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AppContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [tableId, setTableId] = useState("5");

  const loadRole = async (userId) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    const { data, error } = await supabase
      .from("user_data")
      .select("role")
      .eq("auth_user_id", userId)
      .maybeSingle();
    if (!error && data?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let subscription;
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      await loadRole(session?.user?.id);
      setLoading(false);

      const { data } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          await loadRole(session?.user?.id);
        }
      );
      subscription = data.subscription;
    };
    init();
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // const table_id = async () => {
  //   const { data: user_data } = await supabase
  //     .from("user_data")
  //     .select("id")
  //     .eq("auth_user_id", user?.id)
  //     .single();
  //   setTableId(user_data?.id);
  //   console.log("user_data :", user_data);
  // };

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signup = async ({ email, password, firstName, lastName }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data?.user?.id) {
      const { error: insertError } = await supabase.from("user_data").insert({
        auth_user_id: data.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role: "user",
      });
      if (insertError) {
        console.error("Error inserting user data:", insertError);
        // Don't throw here as the user is still created in auth, just log the error
      }
    }
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    router.replace("/");
  };

  const value = useMemo(
    () => ({
      user,
      session,
      isAdmin,
      loading,
      login,
      signup,
      logout,
    }),
    [user, session, isAdmin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
