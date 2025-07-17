import { AnalysisResultSkeleton } from '@/components/ui/AnalysisResultSkeleton';

interface ListCardSkeletonProps {
  count?: number;
}

export function ListCardSkeleton({ count = 5 }: ListCardSkeletonProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: count }).map((_, idx) => (
        <AnalysisResultSkeleton key={idx} />
      ))}
    </div>
  );
}
