-- Drop the partially created objects from failed migration
DROP TABLE IF EXISTS public.issue_assignments;
ALTER TABLE public.issues DROP COLUMN IF EXISTS assigned_to;
ALTER TABLE public.issues DROP COLUMN IF EXISTS assigned_department;
ALTER TABLE public.issues DROP COLUMN IF EXISTS assigned_at;

-- Add assignment columns to issues table
ALTER TABLE public.issues
ADD COLUMN assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN assigned_department text,
ADD COLUMN assigned_at timestamp with time zone;

-- Create issue_assignments table for tracking assignment history
CREATE TABLE public.issue_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id uuid NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  department text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.issue_assignments ENABLE ROW LEVEL SECURITY;

-- Users with roles can view all assignments (officials are stored in user_roles table)
CREATE POLICY "Officials can view all assignments"
ON public.issue_assignments
FOR SELECT
USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Users with roles can create assignments
CREATE POLICY "Officials can insert assignments"
ON public.issue_assignments
FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Enable realtime for assignments
ALTER PUBLICATION supabase_realtime ADD TABLE public.issue_assignments;