import { axiosInstance } from "@/lib/axios/axios";
import { AllDonationsType } from "@/types/donationsType";
import { useQuery } from "@tanstack/react-query";

interface Response {
  status: string;
  response: AllDonationsType;
}

export const useGetDetailDonation = (donationId: string) => {
  return useQuery({
    queryKey: ["donation", donationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response>(
        `/donations/${donationId}`,
      );
      return data.response;
    },
    enabled: !!donationId,
  });
};
