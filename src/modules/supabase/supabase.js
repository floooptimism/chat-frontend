import { createClient } from "@supabase/supabase-js";
import useAuthStore from "../../stores/auth.store";
import pinia from "../../stores/piniaInstance";

const supabase = createClient(
  "https://dzcqwycbvybucsdkrevg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Y3F3eWNidnlidWNzZGtyZXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjExMzEsImV4cCI6MTk2NTQ5NzEzMX0.7rVGq2Po4c1uxZjNWyFQaAOaZadgnxRhjXofm9_Sc80",
  {
    persistSession: true,
    detectSessionInUrl: true
  }
);

export function initSupaBase() {
  let authStore = useAuthStore(pinia);
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event);
    if (session) {
      authStore.setAuth(true);
      authStore.setToken(session.provider_token);
    } else {
      authStore.setAuth(false);
      authStore.setToken(null);
    }
  });
}


export default supabase;
