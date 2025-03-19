import Skeleton from "@/components/loadings/Skeleton";
import LoadingSkeletonCardDonation from "./LoadingSkeletonCardDonation";

const LoadingSkeletonDashboard = () => {
  return (
    <div className="grid gap-2 md:grid-cols-5 md:gap-4">
      <Skeleton className="h-75 md:col-span-2 md:row-span-2" />
      <Skeleton className="h-75 md:col-span-3 md:col-start-3 md:row-span-2" />
      <div className="h-75 md:col-span-5 md:row-span-2 md:row-start-3">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
          <LoadingSkeletonCardDonation />
          <LoadingSkeletonCardDonation />
          <LoadingSkeletonCardDonation />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeletonDashboard;
