# Production deployment checklist

## Verified
- [x] GitHub repository is connected and writable.
- [x] Vite/React build configuration is present.
- [x] `.env` files are ignored by Git.
- [x] Supabase project is healthy.
- [x] Supabase tables have RLS enabled.
- [x] Teacher profile primary key is `user_id`.
- [x] Wallet tables and booking RPCs exist.
- [x] Foreign-key and RLS-supporting indexes are present.
- [x] Production hardening migration added to revoke the development wallet recharge from application roles.
- [x] Generated Supabase TypeScript types added.
- [x] CI build workflow added.
- [x] Production-readiness work is isolated on `predeploy-production-readiness`.

## Blocking issues before a real production launch
- [x] Frontend authentication, teacher discovery, wallet reads, transaction reads, bookings, booking cancellation, and trial/paid booking RPC calls are wired to Supabase. The live session screen is still simulated.
- [x] Supabase email/password Auth is wired into the current UI.
- [x] The current frontend calls `create_booking` / `cancel_booking`.
- [x] Real future availability timestamps are loaded from `availability_slots`.
- [ ] Stripe payment processing is not implemented; wallet funding is intentionally disabled until the Stripe flow is connected.
- [ ] Live video/session infrastructure is not implemented; the current session screen is a timer simulation.
- [ ] Teacher onboarding/admin workflows are not implemented.
- [ ] The core application tables currently have zero teacher/availability rows, so production teacher discovery remains empty until teacher accounts are onboarded.
- [ ] Production Auth redirect/site URLs must be configured for the final Vercel domain.
- [ ] Vercel Production environment variables must be configured. The branch CI build currently passes.
- [ ] End-to-end tests for signup, booking race conditions, wallet charge/refund, and session completion are still required.

## Security notes
The booking RPCs are intentionally `SECURITY DEFINER` because they perform atomic wallet/slot/bookings writes under server-side authorization. They already pin `search_path` and validate `auth.uid()`. They remain executable only by `authenticated`. The Supabase security linter warning for these two RPCs should therefore be reviewed as an intentional exception rather than blindly removing their access.

The development wallet recharge is not a production payment mechanism and is revoked from `anon` and `authenticated` in the hardening migration.

## Launch gate
Do **not** merge this branch into `main` or switch the Vercel project to production until the blocking items above are completed and verified end-to-end.