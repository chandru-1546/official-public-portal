-- Add location columns to issues table
ALTER TABLE public.issues 
ADD COLUMN latitude DOUBLE PRECISION,
ADD COLUMN longitude DOUBLE PRECISION,
ADD COLUMN location_address TEXT;