import { NextResponse } from "next/server";
import { isStripeDemoMode } from "@/lib/demo-mode";
import { getAdminSupabaseClient } from "@/lib/supabase/server";

// In-memory set for deduplicating event IDs during demo execution
const processedEventsStore = new Set<string>();

interface StripeEventPayload {
  id: string;
  type: string;
  data?: {
    object?: {
      id?: string;
      customer?: string;
      status?: string;
      amount_paid?: number;
    };
  };
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const rawBody = await request.text();

  if (isStripeDemoMode()) {
    return NextResponse.json({
      received: true,
      demo: true,
      message: "Demo mode: webhook endpoint active (Stripe keys unconfigured).",
    });
  }

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe signature or webhook secret configuration." },
      { status: 400 }
    );
  }

  let event: StripeEventPayload;
  try {
    event = JSON.parse(rawBody) as StripeEventPayload;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid JSON payload";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const eventId = event.id;
  const eventType = event.type;

  // Deduplicate using processed_webhook_events
  const supabase = getAdminSupabaseClient();
  if (supabase) {
    const { data: existing } = await supabase
      .from("processed_webhook_events")
      .select("event_id")
      .eq("event_id", eventId)
      .single();

    if (existing) {
      return NextResponse.json({ received: true, deduplicated: true });
    }

    await supabase.from("processed_webhook_events").insert({
      event_id: eventId,
      event_type: eventType,
      processed_at: new Date().toISOString(),
    });
  } else {
    if (processedEventsStore.has(eventId)) {
      return NextResponse.json({ received: true, deduplicated: true });
    }
    processedEventsStore.add(eventId);
  }

  // Handle Event Types
  switch (eventType) {
    case "checkout.session.completed": {
      const session = event.data?.object;
      console.log(`Checkout session completed for customer ${session?.customer}`);
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data?.object;
      console.log(`Subscription updated for ${sub?.id}: status ${sub?.status}`);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data?.object;
      console.log(`Subscription cancelled: ${sub?.id}`);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data?.object;
      console.log(`Invoice paid: ${invoice?.id} amount: ${invoice?.amount_paid}`);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data?.object;
      console.warn(`Invoice payment failed: ${invoice?.id}`);
      break;
    }

    default:
      console.log(`Unhandled Stripe event type: ${eventType}`);
  }

  return NextResponse.json({ received: true });
}
