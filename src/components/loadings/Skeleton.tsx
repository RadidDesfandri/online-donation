import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={clsx("animate-pulse rounded-md bg-gray-300", className)} />
  );
};

export default Skeleton;
