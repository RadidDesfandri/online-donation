import { getToken } from "@/actions/getToken";
import { axiosInstance } from "@/lib/axios/axios";
import { AllDonationsType } from "@/types/donationsType";
import { useQuery } from "@tanstack/react-query";

interface Response {
  status: string;
  response: AllDonationsType[];
}

export const useGetDonationProvider = () => {
  return useQuery({
    queryKey: ["donations-provider"],
    queryFn: async () => {
      const token = await getToken();

      const { data } = await axiosInstance.get<Response>(
        "/donations/get-provider-donations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },
  });
};
