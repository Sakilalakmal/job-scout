import { JobFilter } from "@/components/general/JobFilter";
import { JobListingSkeleton } from "@/components/general/JobListingSkeleton";
import { JobListingView } from "@/components/general/JobListingView";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const jobTypes = params.jobTypes?.split(",") || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingSkeleton />} key={currentPage}>
          <JobListingView currentPage={currentPage} jobTypes={jobTypes} />
        </Suspense>
      </div>
    </div>
  );
}
