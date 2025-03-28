import { useToast } from "@/context/ToastContext";
import { axiosInstance } from "@/lib/axios/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface CheckoutPayload {
  amount: string;
  email: string;
  message: string;
  donorName: string;
  donationId: string;
}

export const useCheckoutDonation = () => {
  const { addToast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const { data } = await axiosInstance.post("/payments/checkout", {
        amount: parseInt(payload.amount),
        email: payload.email,
        message: payload.message,
        donorName: payload.donorName,
        donationId: payload.donationId,
      });

      return data;
    },
    onSuccess: (data) => {
      router.push(data.paymentUrl);
    },
    onError: (error) => {
      console.log("ERROR SAAT MENGIRIM DATA:", error);
      if (error instanceof AxiosError) {
        addToast(error.response?.data || error.message, "error");
      }
    },
  });
};
