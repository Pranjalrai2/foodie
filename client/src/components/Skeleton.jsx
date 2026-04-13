const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-[#2D2D2D] rounded-xl ${className}`}></div>
  );
};

export const FoodSkeleton = () => (
  <div className="premium-card h-[450px] overflow-hidden">
    <Skeleton className="h-56 w-full rounded-b-none" />
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="h-7 w-1/5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex justify-between items-end pt-4">
        <div className="space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-12 w-12 rounded-2xl" />
      </div>
    </div>
  </div>
);

export default Skeleton;
