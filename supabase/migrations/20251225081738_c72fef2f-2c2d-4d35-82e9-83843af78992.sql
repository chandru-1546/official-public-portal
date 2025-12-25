-- Add department column to user_roles table
ALTER TABLE public.user_roles 
ADD COLUMN department text;