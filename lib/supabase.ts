// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// **************** IN DO LINES KO APNI KEYS SE REPLACE KAREIN *****************
const supabaseUrl = "https://ilfzhxbsxbrqtdnomdtl.supabase.co"; // <--- Replace this with your actual URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZnpoeGJzeGJycXRkbm9tZHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjMxNTUsImV4cCI6MjA4MDgzOTE1NX0.Y8w7DKAWk8blj6Pp04Rz3LJydRkxkDGg1h_nTVwdcng"; // <--- Replace this with your actual Anon Key
// *****************************************************************************

// Yeh check ensure karega ki aapne galti nahi ki
if (!supabaseUrl.startsWith("https://") || supabaseKey.length < 50) {
    throw new Error('Supabase URL format galat hai. Check karein ki URL https:// se shuru ho.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);