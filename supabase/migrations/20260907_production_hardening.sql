-- Production hardening for the public Data API.
-- Booking RPCs intentionally remain callable by authenticated users because
-- the browser client will call them with the user's JWT.
-- The development wallet recharge must never be callable by application users.

revoke execute on function public.dev_recharge_wallet(numeric) from public, anon, authenticated;

-- Keep the booking RPC surface explicit.
revoke execute on function public.create_booking(uuid, uuid, public.booking_type, integer) from public, anon;
grant execute on function public.create_booking(uuid, uuid, public.booking_type, integer) to authenticated;

revoke execute on function public.cancel_booking(uuid) from public, anon;
grant execute on function public.cancel_booking(uuid) to authenticated;

-- Defensive privilege hardening for trigger-only functions.
revoke execute on function public.prevent_role_change() from public, anon, authenticated;
revoke execute on function public.protect_teacher_columns() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
