import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { JobCard } from "@/components/general/JobCard";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BanIcon } from "lucide-react";

async function getFavAllJobPost(userId: string) {
  const data = await prisma.favoriteJobPosts.findMany({
    where: {
      userId: userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createAt: true,
          Company: {
            select: {
              name: true,
              location: true,
              logo: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function FavoritesPage() {
  const user = await auth();

  const favJobPost = await getFavAllJobPost(user?.user?.id as string);

  if (favJobPost.length === 0) {
    return (
      <Empty className="border border-dashed ">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BanIcon className="text-primary size-10" />
          </EmptyMedia>
          <EmptyTitle>Favorite Job posts isn&apos;t available</EmptyTitle>
          <EmptyDescription>
            Currently you do not have any favorite job posts.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent></EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {favJobPost.map((favJob) => (
        <JobCard jobData={favJob.JobPost} key={favJob.JobPost.id} />
      ))}
    </div>
  );
}
