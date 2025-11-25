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

async function getCompanyJobPostingData() {
  const jobpostData = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
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
  });

  return jobpostData;
}

export async function JobListingView() {
  const jobPostingData = await getCompanyJobPostingData();

  return (
    <>
      {jobPostingData.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobPostingData.map((jobPost) => (
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
    </>
  );
}
