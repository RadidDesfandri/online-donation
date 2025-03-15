import { useToast } from "@/context/ToastContext";
import { axiosInstance } from "@/lib/axios/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface PayloadAuth {
  email: string;
  password: string;
}

export const useRegister = () => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (payload: PayloadAuth) => {
      const { data } = await axiosInstance.post("/auth/register", {
        email: payload.email,
        password: payload.password,
      });

      return data;
    },
    onSuccess: (data) => {
      addToast(data.msg);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        addToast(error.response?.data || error.message, "error");
      }
    },
  });
};
