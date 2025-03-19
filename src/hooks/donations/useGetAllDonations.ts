import { axiosInstance } from "@/lib/axios/axios";
import { AllDonationsType } from "@/types/donationsType";
import { Pagination } from "@/types/globalType";
import { useQuery } from "@tanstack/react-query";

interface Response {
  status: string;
  pagination: Pagination;
  response: AllDonationsType[];
}

export const useGetAllDonations = () => {
  return useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response>(
        "/donations/get-all-donations",
      );

      return data;
    },
  });
};
