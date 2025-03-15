import { useToast } from "@/context/ToastContext";
import { axiosInstance } from "@/lib/axios/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { PayloadAuth } from "./useRegister";

export const useLogin = () => {
  const router = useRouter();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (payload: PayloadAuth) => {
      const { data } = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      return data;
    },
    onSuccess: (data) => {
      addToast(data.msg);
      router.push("/");
    },
    onError: (error) => {
      console.log("ERROR SAAT MENGIRIM DATA:", error);
      if (error instanceof AxiosError) {
        addToast(error.response?.data || error.message, "error");
      }
    },
  });
};
