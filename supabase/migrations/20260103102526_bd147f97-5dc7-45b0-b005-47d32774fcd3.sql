-- Fix user_roles SELECT policy to avoid recursive reference
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_roles'
      AND policyname = 'Officials can view all roles'
  ) THEN
    EXECUTE 'DROP POLICY "Officials can view all roles" ON public.user_roles';
  END IF;
END $$;

-- Allow administrators to view all roles (non-recursive via security definer function)
CREATE POLICY "Administrators can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'administrator') OR auth.uid() = user_id);
