// import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request) {
  try {
    // const supabase = createServerClient();

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { businessName, businessType, state, address, ownerInfo } = body;

    // Validate required fields
    if (!businessName || !businessType || !state) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create business formation record
    const { data: business, error } = await supabase
      .from("business_formations")
      .insert({
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
        state: state,
        address: address,
        owner_info: ownerInfo,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to create business formation" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, business });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // const supabase = createServerClient();

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's business formations
    const { data: businesses, error } = await supabase
      .from("business_formations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch businesses" },
        { status: 500 }
      );
    }

    return NextResponse.json({ businesses });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
