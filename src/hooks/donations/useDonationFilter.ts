import { AllDonationsType } from "@/types/donationsType";
import { useEffect, useState } from "react";
import { useGetAllDonations } from "./useGetAllDonations";

export const useDonationFilter = (category: string, limit: number) => {
  const [donations, setDonations] = useState<AllDonationsType[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { data, isPending } = useGetAllDonations({ category, limit });

  useEffect(() => {
    if (data?.response) {
      if (isLoadingMore) {
        setDonations((prev) => [...prev, ...data.response]);
        setIsLoadingMore(false);
      } else {
        setDonations(data.response);
      }
    }
  }, [data, isLoadingMore]);

  const loadMore = () => {
    setIsLoadingMore(true);
    return limit + 6;
  };

  return {
    donations,
    isPending: isPending && !isLoadingMore,
    isLoadingMore,
    loadMore,
    pagination: data?.pagination,
  };
};
