"use client";

import Empty from "@/components/Empty";
import { useGetDonationProvider } from "@/hooks/donations/useGetDonationProvider";
import CardDonationProvider from "./CardDonationProvider";
import LoadingSkeletonCardDonation from "./LoadingSkeletonCardDonation";

const ListDonationProvider = () => {
  const { data, isPending } = useGetDonationProvider();

  if (isPending) {
    return (
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
        <LoadingSkeletonCardDonation />
        <LoadingSkeletonCardDonation />
        <LoadingSkeletonCardDonation />
      </div>
    );
  }

  if (!data?.response.length) {
    return <Empty text="Anda tidak memiliki donasi" />;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
      {data?.response.map((item) => (
        <CardDonationProvider
          key={item.id}
          id={item.id}
          tags={item.tag}
          title={item.title}
          thumbnail={item.thumbnail}
          targetAmount={item.amount}
        />
      ))}
    </div>
  );
};

export default ListDonationProvider;
