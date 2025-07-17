import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisResultSkeleton() {
  return (
    <li className="flex items-center gap-2.5 border border-gray-300 rounded-[5px] p-2.5 h-[80px]">

      <Skeleton className="w-[60px] h-[60px] rounded-md" />

      <div className="flex flex-col gap-[5px] flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </li>
  );
}
