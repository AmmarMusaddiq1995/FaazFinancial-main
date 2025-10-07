"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CorporationFormationForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
  });

  const router = useRouter();
  const { user } = useAuthContext();
  const [userPersonalId, setUserPersonalId] = useState(null);

  // --- NEW: modal state ---
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("user_data")
        .select("id")
        .eq("auth_user_id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUserPersonalId(data.id);
      }
    };

    fetchUserData();
  }, [user]);

  // --- Show modal before inserting ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // --- Confirm and insert data into Supabase ---
  const confirmSubmit = async () => {
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user || userError) {
        alert("Please login to submit business formation", userError);
        return;
      }

      const submissionData = {
        ...formData,
      };

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Corporation Formation",
          form_data: submissionData,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setShowModal(false);
      router.push("/form-submission-success");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Your Corporation Formation
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your corporation formation process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <Label htmlFor="desiredCompanyName">Desired company name</Label>
                <Input
                  id="desiredCompanyName"
                  value={formData.desiredCompanyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      desiredCompanyName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternativeCompanyName">
                  Alternative company name
                </Label>
                <Input
                  id="alternativeCompanyName"
                  value={formData.alternativeCompanyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alternativeCompanyName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start Corporation Formation"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* --- Confirmation Dialog --- */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your details</DialogTitle>
            <DialogDescription>
              Review your information before submitting. You can go back to edit
              if needed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">
                Desired company name:{" "}
              </span>
              <span className="font-medium">{formData.desiredCompanyName}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">
                Alternative company name:{" "}
              </span>
              <span className="font-medium">
                {formData.alternativeCompanyName}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm & submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
