-- Add assigned_zone column to issues table for zone-based filtering
ALTER TABLE public.issues 
ADD COLUMN assigned_zone text;