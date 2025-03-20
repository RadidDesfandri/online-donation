import { axiosInstance } from "@/lib/axios/axios";
import { AllDonationsType } from "@/types/donationsType";
import { Pagination, QueryPagination } from "@/types/globalType";
import { useQuery } from "@tanstack/react-query";

interface Response {
  status: string;
  pagination: Pagination;
  response: AllDonationsType[];
}

interface QueryParams extends QueryPagination {
  category?: string;
}

export const useGetAllDonations = (query: QueryParams = {}) => {
  return useQuery({
    queryKey: [
      "donations",
      query.category,
      query.limit,
      query.page,
      query.search,
    ],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Response>(
        "/donations/get-all-donations",
        { params: query },
      );

      return data;
    },
  });
};
