import { axiosInstance } from "@/lib/axios/axios";
import { axiosError } from "@/lib/axios/axiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PayloadAuth } from "./useRegister";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: PayloadAuth) => {
      const { data } = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      return data;
    },
    onSuccess: (data) => {
      alert(data.msg);
      router.push("/");
    },
    onError: (error) => {
      console.log("ERROR SAAT MENGIRIM DATA:", error);
      axiosError(error);
    },
  });
};
