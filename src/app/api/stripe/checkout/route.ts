import { NextResponse } from "next/server";
import { createStripeCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planType, userId, userEmail, charityId } = body;

    if (!planType || !userId || !userEmail) {
      return NextResponse.json(
        { error: "Missing required parameters: planType, userId, userEmail" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const result = await createStripeCheckoutSession({
      planType,
      userId,
      userEmail,
      charityId,
      successUrl: `${appUrl}/dashboard?payment=success`,
      cancelUrl: `${appUrl}/pricing?payment=cancelled`,
    });

    return NextResponse.json({ url: result.url, isDemo: result.isDemo });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
