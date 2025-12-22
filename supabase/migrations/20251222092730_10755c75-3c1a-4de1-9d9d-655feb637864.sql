-- Create issues table
CREATE TABLE public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved', 'rejected')),
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Users can view their own issues
CREATE POLICY "Users can view their own issues"
ON public.issues FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own issues
CREATE POLICY "Users can insert their own issues"
ON public.issues FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own issues
CREATE POLICY "Users can update their own issues"
ON public.issues FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own issues
CREATE POLICY "Users can delete their own issues"
ON public.issues FOR DELETE
USING (auth.uid() = user_id);

-- Officials can view all issues
CREATE POLICY "Officials can view all issues"
ON public.issues FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
  )
);

-- Officials can update any issue status
CREATE POLICY "Officials can update issues"
ON public.issues FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_issues_updated_at
BEFORE UPDATE ON public.issues
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for issue attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('issue-attachments', 'issue-attachments', true);

-- Storage policies for issue attachments
CREATE POLICY "Anyone can view issue attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'issue-attachments');

CREATE POLICY "Authenticated users can upload issue attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'issue-attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own attachments"
ON storage.objects FOR DELETE
USING (bucket_id = 'issue-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);