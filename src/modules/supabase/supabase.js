import { createClient } from "@supabase/supabase-js";
import useAuthStore from "../../stores/auth.store";
import pinia from "../../stores/piniaInstance";
import { setupClient } from "../client/ChatClientInstance";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE,
  import.meta.env.VITE_SUPABASEANONKEY,
  {
    persistSession: true,
    detectSessionInUrl: true,
  }
);

export function initSupaBase() {
  let authStore = useAuthStore(pinia);
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      authStore.setAuth(true);
      authStore.setToken(session.access_token);
      setupClient(session.access_token);
    } else {
      authStore.setAuth(false);
      authStore.setToken(null);
    }
  });
}

export default supabase;
