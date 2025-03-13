import { axiosInstance } from "@/lib/axios/axios";
import { axiosError } from "@/lib/axios/axiosError";
import { useMutation } from "@tanstack/react-query";

export interface PayloadAuth {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: PayloadAuth) => {
      const { data } = await axiosInstance.post("/auth/register", {
        email: payload.email,
        password: payload.password,
      });

      return data;
    },
    onSuccess: (data) => {
      alert(data.msg);
    },
    onError: (error) => {
      axiosError(error);
    },
  });
};
