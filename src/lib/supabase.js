import { createClient } from '@supabase/supabase-js'

// import.meta.env because Vite is fun like that :D
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY


// DEBUG: If these log as 'undefined' in your browser console, your .env is the problem
console.log("Connecting to:", supabaseUrl); 
console.log("Supabase URL Value:", supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing! Check your .env file.");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey)