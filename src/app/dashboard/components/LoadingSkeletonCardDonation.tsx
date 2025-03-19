import Skeleton from "@/components/loadings/Skeleton";

const LoadingSkeletonCardDonation = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gray-100 p-2 shadow-md">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <div className="mt-2 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-10 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-1/2" />
    </div>
  );
};

export default LoadingSkeletonCardDonation;
