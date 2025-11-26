import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/required-user";
import { MyJobsEditPage } from "@/components/forms/EditJobForm";
import { notFound } from "next/navigation";

async function getJobData(jobId: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      Company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      Company: {
        select: {
          about: true,
          name: true,
          location: true,
          website: true,
          XAccount: true,
          logo: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ jobId: string }>;

export default async function MyJobsPostEditPage({
  params,
}: {
  params: Params;
}) {
  const { jobId } = await params;
  const user = await requiredUser();

  const data = await getJobData(jobId, user.id as string);

  return <MyJobsEditPage jobPostData={data} />;
}
