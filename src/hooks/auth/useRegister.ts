import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/auth/register");
      return data;
    },
    onSuccess: (data) => {
      alert(data.msg);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error.message);
      } else {
        alert("Something went wrong!");
      }
    },
  });
};
