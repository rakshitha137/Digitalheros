# Operations Runbook & Incident Recovery

Operational guidance for administrative tasks, monthly draw management, winner verification, and incident recovery.

---

## 1. Monthly Draw Lifecycle Execution

1. Navigate to `/admin/draws`.
2. Select Year, Month, Mode (Random or Algorithmic), and enter Subscription Revenue (in cents).
3. Click **Run Draw Simulation** to preview winning numbers, prize pool allocations (40%/35%/25%), and winner tier splits.
4. Verify rollover amounts brought forward and carried forward.
5. Click **Publish Draw Results**. Publishing is idempotent and records an entry in `audit_logs`.

---

## 2. Winner Verification Queue

1. Navigate to `/admin/winners`.
2. Locate claims with status `proof_submitted`.
3. Click **Generate Signed Preview URL** to inspect the uploaded scorecard or PDF proof file.
4. If valid, click **Approve Claim**. If invalid, enter review notes and click **Reject**.
5. When payout is issued, enter the payment reference ID and click **Mark Payout Paid**.

---

## 3. Incident Recovery Procedures

- **Stripe Webhook Disruption**: If webhooks are missed, run subscription sync task via admin console to pull current state from Stripe API.
- **Draw Simulation Error**: Draw publishing is transactional and idempotent. Draft draws can be re-simulated safely prior to publishing.
