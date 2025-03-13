import { getToken } from "@/actions/getToken";
import { axiosInstance } from "@/lib/axios/axios";
import { AllUserType } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const token = await getToken();

      const { data } = await axiosInstance.get<AllUserType>(
        "/auth/get-current-user",
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
