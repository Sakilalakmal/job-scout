import { prisma } from "@/app/utils/db";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Folder } from "lucide-react";
import { JobCard } from "./JobCard";
import { MainPagination } from "./MainPagination";

async function getCompanyJobPostingData(
  page: number = 1,
  pageSize: number = 2
) {
  const skip = (page - 1) * pageSize;

  const [jobpostData, totalCount] = await Promise.all([
    await prisma.jobPost.findMany({
      where: {
        status: "ACTIVE",
      },
      take: pageSize,
      skip: skip,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createAt: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    }),

    await prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    jobpostData,
    totalCount: Math.ceil(totalCount / pageSize),
  };
}

export async function JobListingView({ currentPage }: { currentPage: number }) {
  const { jobpostData, totalCount } = await getCompanyJobPostingData(
    currentPage
  );

  return (
    <>
      {jobpostData.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobpostData.map((jobPost) => (
            <JobCard key={jobPost.id} jobData={jobPost} />
          ))}
        </div>
      ) : (
        <Empty className="border border-dashed ">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder className="text-primary size-10" />
            </EmptyMedia>
            <EmptyTitle>Job isn&apos;t available</EmptyTitle>
            <EmptyDescription>
              We couldn&apos;t find any job postings at the moment. Please check
              again later.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent></EmptyContent>
        </Empty>
      )}

      <div className="flex justify-center mt-8">
        <MainPagination totalPages={totalCount} currentPage={currentPage} />
      </div>
    </>
  );
}
