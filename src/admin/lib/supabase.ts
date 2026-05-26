import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://lsfpnynvzfprykfptsns.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZnBueW52emZwcnlrZnB0c25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MDY4MjQsImV4cCI6MjA5NTI4MjgyNH0.ZljjzzuChhhBVYrvRrJV53M9_fwqrN3e4nzYphpC4bg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
