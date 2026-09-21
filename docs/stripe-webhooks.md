# Stripe Webhook Integration & Security

Documentation for the Stripe Webhook integration located at `/api/stripe/webhook`.

---

## 1. Request Handling & Signature Security

- **Raw Body Consumption**: The webhook handler reads the raw unparsed request body text (`request.text()`).
- **Signature Validation**: Verifies the `Stripe-Signature` header against `STRIPE_WEBHOOK_SECRET`. Invalid signatures return HTTP 400 immediately.
- **Event Deduplication**: Webhook event IDs are stored in `processed_webhook_events`. Duplicate payloads return `{ received: true, deduplicated: true }`.

---

## 2. Event Types Handled

- `checkout.session.completed`: Synchronizes completed subscription session to `subscriptions`.
- `customer.subscription.created` / `customer.subscription.updated`: Updates subscription status (`active`, `canceled`, `past_due`) and period timestamps.
- `customer.subscription.deleted`: Marks subscription as `canceled`.
- `invoice.paid`: Logs successful subscription invoice payment and allocates charity contribution.
- `invoice.payment_failed`: Marks subscription as `past_due`.
