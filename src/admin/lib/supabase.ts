import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://lsfpnynvzfprykfptsns.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable__9Bgf1mTiaJV0y5QyTnFMQ_0mi8twT_";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
