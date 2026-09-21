import { NextResponse } from "next/server";
import { createStripePortalSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stripeCustomerId } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const result = await createStripePortalSession({
      stripeCustomerId: stripeCustomerId || "cus_demo_123",
      returnUrl: `${appUrl}/dashboard`,
    });

    return NextResponse.json({ url: result.url, isDemo: result.isDemo });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Portal session failed";
    console.error("Stripe Portal Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
