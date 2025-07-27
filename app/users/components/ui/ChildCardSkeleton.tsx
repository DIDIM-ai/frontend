'use client';

import { Skeleton } from "@/components/ui/skeleton";

export function ChildCardSkeleton() {
  return (
    <div className="w-[140px] h-[140px] rounded-[5px] border border-gray-200 bg-white shadow-sm p-3 flex flex-col items-center justify-center gap-2">
      <Skeleton className="w-[70px] h-[70px] rounded-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-2/4" />
    </div>
  );
}
