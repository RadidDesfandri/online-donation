import { supabaseClientComponent } from "@/lib/supabase/supabaseClientComponent";

export const getToken = async () => {
  const { data, error } = await supabaseClientComponent.auth.getSession();

  if (error || !data.session) return null;

  return data.session.access_token;
};
