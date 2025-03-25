import Skeleton from "@/components/loadings/Skeleton";

const LoadingSkeletonDetailDonation = () => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-6 md:grid-cols-5 md:grid-rows-5">
      <div className="h-60 w-full md:col-span-5 md:row-span-4 md:h-[450px]">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="flex flex-col gap-3 px-5 md:col-span-3 md:row-start-5 md:px-10 md:pl-40">
        <Skeleton className="h-10 w-80" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-8" />
          <Skeleton className="h-5 w-8" />
          <Skeleton className="h-5 w-8" />
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 md:col-span-2 md:col-start-4 md:row-start-5 md:px-10 md:pr-40">
        <Skeleton className="h-10 w-full" />
        <div className="flex w-full items-center gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeletonDetailDonation;
