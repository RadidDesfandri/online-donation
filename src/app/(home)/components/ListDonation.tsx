"use client";

import LoadingSkeletonCardDonation from "@/app/dashboard/components/LoadingSkeletonCardDonation";
import Button from "@/components/buttons/Button";
import Empty from "@/components/Empty";
import { useDonationFilter } from "@/hooks/donations/useDonationFilter";
import { AllDonationsType } from "@/types/donationsType";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardDonation from "./CardDonation";

const ListDonation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const initialLimit = Number(searchParams.get("limit")) || 6;

  const [limit, setLimit] = useState(initialLimit);

  const { donations, isPending, isLoadingMore, loadMore, pagination } =
    useDonationFilter(category, limit);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    params.set("limit", String(limit));
    router.push(`?${params.toString()}`, { scroll: false });
  }, [category, limit, router, searchParams]);

  const handleLoadMore = () => {
    setLimit(loadMore());
  };

  if (isPending) {
    return <DonationSkeleton />;
  }

  if (!donations.length) {
    return <Empty text="Belum ada donasi yang tersedia" />;
  }

  return (
    <>
      <DonationGrid donations={donations} isLoadingMore={isLoadingMore} />

      {pagination && pagination.totalData > limit && (
        <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
      )}
    </>
  );
};

const DonationSkeleton = () => (
  <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
    <LoadingSkeletonCardDonation />
    <LoadingSkeletonCardDonation />
    <LoadingSkeletonCardDonation />
  </div>
);

const DonationGrid = ({
  donations,
  isLoadingMore,
}: {
  donations: AllDonationsType[];
  isLoadingMore: boolean;
}) => (
  <>
    <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {donations.map((item, idx) => (
        <CardDonation
          key={`${item.id}-${idx}`}
          id={item.id}
          header={item.title}
          thumbnail={item.thumbnail}
          totalAmount={item.amount}
          tagline={item.tag}
        />
      ))}
    </div>
    {isLoadingMore && <DonationSkeleton />}
  </>
);

const LoadMoreButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) => (
  <div className="mt-10 flex items-center justify-center md:mt-16">
    <Button
      outline
      className="w-full px-8 py-4 font-semibold md:w-fit"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Load More"}
    </Button>
  </div>
);

export default ListDonation;
