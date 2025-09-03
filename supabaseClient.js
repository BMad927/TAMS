import { createClient } from '@supabase/supabase-js'

// replace these with your actual values from Supabase settings
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co"
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
