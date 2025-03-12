import { axiosInstance } from "@/lib/axios/axios";
import { supabaseClientComponent } from "@/lib/supabase/supabaseClientComponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useSocialLogin = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: authListener } =
      supabaseClientComponent.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const user = session.user;

          if (!isAuthenticated) {
            setIsAuthenticated(true);
            await axiosInstance.post("/auth/social-login", {
              email: user.email,
              username: user.user_metadata.full_name,
              avatar: user.user_metadata.avatar_url,
            });
            router.push("/");
          }
        }
      });

    return () => authListener.subscription.unsubscribe();
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      const { error } = await supabaseClientComponent.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_BASE_WEB_URL + "/auth",
        },
      });

      if (error) throw error;
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };

  return { handleLogin };
};
