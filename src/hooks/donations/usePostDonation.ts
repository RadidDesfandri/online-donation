import { getToken } from "@/actions/getToken";
import { useToast } from "@/context/ToastContext";
import { axiosInstance } from "@/lib/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface Payload {
  title: string;
  content: string;
  tag: string[];
  thumbnail: string | null;
  amount: number;
  category: string;
}

export const usePostDonation = () => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Payload) => {
      const token = await getToken();

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("tag", JSON.stringify(values.tag));
      formData.append("thumbnail", values.thumbnail || "");
      formData.append("amount", String(values.amount));
      formData.append("category", String(values.category));

      const { data } = await axiosInstance.post(
        "/donations/create-donation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },
    onSuccess: (data) => {
      addToast(data.msg);
      queryClient.invalidateQueries({
        queryKey: [
          "donations",
          "donation",
          "pie-chart-donation",
          "bar-chart-donation",
        ],
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log("ERROR SAAT MENGIRIM DATA:", error);
      if (error instanceof AxiosError) {
        addToast(error.response?.data || error.message, "error");
      }
    },
  });
};
