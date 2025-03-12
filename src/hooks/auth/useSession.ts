import { supabaseClientComponent } from "@/lib/supabase/supabaseClientComponent";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabaseClientComponent.auth.getSession();
      if (!error && data.session) {
        setSession(data.session);
      } else {
        setSession(null);
      }
      setisLoading(false);
    };

    fetchSession();

    const { data: listener } = supabaseClientComponent.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
};
