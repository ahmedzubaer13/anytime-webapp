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
- [ ] The current frontend is still a mock/prototype: teacher data, wallet state, bookings, sessions, and transactions are stored in React state rather than Supabase.
- [ ] Supabase Auth is not wired into the current UI.
- [ ] The current frontend does not call `create_booking` / `cancel_booking`.
- [ ] Real availability timestamps are not used by the current UI.
- [ ] Stripe payment processing is not implemented; the current "Add funds" UI only changes local state.
- [ ] Live video/session infrastructure is not implemented; the current session screen is a timer simulation.
- [ ] Teacher onboarding/admin workflows are not implemented.
- [ ] The database currently has zero rows in the core application tables, so there are no real teachers/availability to display.
- [ ] Production Auth redirect/site URLs must be configured for the final Vercel domain.
- [ ] Vercel Production environment variables must be configured and the production build must pass.
- [ ] End-to-end tests for signup, booking race conditions, wallet charge/refund, and session completion are still required.

## Security notes
The booking RPCs are intentionally `SECURITY DEFINER` because they perform atomic wallet/slot/bookings writes under server-side authorization. They already pin `search_path` and validate `auth.uid()`. They remain executable only by `authenticated`. The Supabase security linter warning for these two RPCs should therefore be reviewed as an intentional exception rather than blindly removing their access.

The development wallet recharge is not a production payment mechanism and is revoked from `anon` and `authenticated` in the hardening migration.

## Launch gate
Do **not** merge this branch into `main` or switch the Vercel project to production until the blocking items above are completed and verified end-to-end.