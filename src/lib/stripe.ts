import { isStripeDemoMode } from "./demo-mode";

export interface StripeCheckoutOptions {
  planType: 'monthly' | 'yearly';
  userId: string;
  userEmail: string;
  charityId?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface StripePortalOptions {
  stripeCustomerId: string;
  returnUrl: string;
}

/**
 * Creates a Stripe Checkout session or returns a local demo URL when Stripe is unconfigured.
 */
export async function createStripeCheckoutSession(options: StripeCheckoutOptions) {
  if (isStripeDemoMode()) {
    return {
      url: `${options.successUrl}?demo_checkout=success&plan=${options.planType}&charity=${options.charityId || 'default'}`,
      isDemo: true,
    };
  }

  // Production Stripe checkout session logic using secret key
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const priceId =
    options.planType === "monthly"
      ? process.env.STRIPE_MONTHLY_PRICE_ID
      : process.env.STRIPE_YEARLY_PRICE_ID;

  if (!stripeSecret || !priceId) {
    throw new Error("Stripe secret key or price ID is missing from environment variables.");
  }

  // Call Stripe API securely on server
  const params = new URLSearchParams({
    "payment_method_types[]": "card",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    mode: "subscription",
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    customer_email: options.userEmail,
    "client_reference_id": options.userId,
    "metadata[charity_id]": options.charityId || "",
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Stripe Checkout Session Creation Failed: ${errorText}`);
  }

  const session = await res.json();
  return { url: session.url, isDemo: false };
}

/**
 * Creates a Stripe Customer Portal session or returns a demo URL.
 */
export async function createStripePortalSession(options: StripePortalOptions) {
  if (isStripeDemoMode()) {
    return {
      url: `${options.returnUrl}?demo_portal=active`,
      isDemo: true,
    };
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    throw new Error("Stripe secret key missing.");
  }

  const params = new URLSearchParams({
    customer: options.stripeCustomerId,
    return_url: options.returnUrl,
  });

  const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Stripe Portal Session Creation Failed: ${errorText}`);
  }

  const session = await res.json();
  return { url: session.url, isDemo: false };
}
