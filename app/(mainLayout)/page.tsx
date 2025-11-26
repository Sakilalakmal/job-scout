import { JobFilter } from "@/components/general/JobFilter";
import { JobListingSkeleton } from "@/components/general/JobListingSkeleton";
import { JobListingView } from "@/components/general/JobListingView";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingSkeleton/>}>
          <JobListingView />
        </Suspense>
      </div>
    </div>
  );
}
