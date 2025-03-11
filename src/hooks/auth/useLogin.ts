import { axiosInstance } from "@/lib/axios/axios";
import { axiosError } from "@/lib/axios/axiosError";
import { useMutation } from "@tanstack/react-query";
import { PayloadAuth } from "./useRegister";
import { navigate } from "@/lib/server";

export const useLogin = () => {
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
      navigate("/");
    },
    onError: (error) => {
      axiosError(error);
    },
  });
};
