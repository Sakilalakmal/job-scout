import { addJobPostToFavorite, removeJobPostFromFavorite } from "@/app/actions";
import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/List-of-company-benefits";
import { JsonToHtmlSanitizer } from "@/components/general/JsonToHtmlSanitizer";
import { AddToFavButton } from "@/components/general/SubmitButton";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:MONITOR", "CATEGORY:SEARCH_ENGINE"],
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 5,
      })
    );
  }
}

async function getJobDetails(jobId: string, userId?: string) {
  const [jobData, favJobPost] = await Promise.all([
    await prisma.jobPost.findMany({
      where: {
        status: "ACTIVE",
        id: jobId,
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefits: true,
        createAt: true,
        listingDuration: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),

    userId
      ? prisma.favoriteJobPosts.findUnique({
          where: {
            jobPostId_userId: {
              jobPostId: jobId,
              userId: userId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return {
    jobData,
    favJobPost,
  };
}

type Params = { params: { jobId: string } };

export default async function JobIdPage({ params }: Params) {
  const { jobId } = await params;

  const session = await auth();

  const req = await request();

  const decision = await getClient(!!session).protect(req, { requested: 10 });
  if (decision.isDenied()) {
    throw new Response("Access Denied", { status: 403 });
  }

  const { jobData, favJobPost } = await getJobDetails(jobId, session?.user?.id);

  const offeredBenefits = jobData[0]?.benefits ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="space-y-8 col-span-2">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{jobData[0]?.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{jobData[0]?.Company?.name}</p>
              <div className="hidden md:inline w-px h-6 bg-border"></div>
              <Badge className="rounded-full" variant={"secondary"}>
                {jobData[0]?.employmentType}
              </Badge>
              <div className="hidden md:inline w-px h-6 bg-border"></div>
              <Badge className="rounded-full">{jobData[0]?.location}</Badge>
            </div>
          </div>

          {session?.user ? (
            <>
              <form
                action={
                  favJobPost
                    ? removeJobPostFromFavorite.bind(null, jobId)
                    : addJobPostToFavorite.bind(null, jobId)
                }
              >
                <AddToFavButton savedJob={!!favJobPost} />
              </form>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                <Heart className="size-4" />
                Add to fav
              </Link>
            </>
          )}
        </div>
        <section>
          <JsonToHtmlSanitizer json={JSON.parse(jobData[0].jobDescription)} />
        </section>

        <section>
          <h3 className="font-semibold mb-4">
            Benefits :{" "}
            <span className="text-xs text-muted-foreground">
              Offered benefits are highlighted
            </span>
          </h3>

          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOfferedBenefits = offeredBenefits.includes(benefit.id);

              return (
                <Badge
                  key={benefit.id}
                  variant={isOfferedBenefits ? "default" : "outline"}
                  className={cn(
                    isOfferedBenefits ? "" : "opacity-50 cursor-not-allowed",
                    "text-sm px-4 py-1.5"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <Card className="p-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Apply now</h3>
              <p className="text-sm text-muted-foreground mt-2">
                let {jobData[0].Company.name} know you are interested in this
                job & you found this job on job scout. That helps us to grow!
              </p>
            </div>

            <Button className="w-full">Apply for this job</Button>
          </div>
        </Card>

        {/* job info card */}
        <Card className="p-8">
          <h3 className="font-semibold">About Job</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Apply Before
              </span>
              <span className="text-sm">
                {new Date(
                  jobData[0].createAt.getTime() +
                    jobData[0].listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Posted On</span>
              <span className="text-sm">
                {new Date(jobData[0].createAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Employment Type
              </span>
              <span className="text-sm">{jobData[0].employmentType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm">{jobData[0].location}</span>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={jobData[0].Company.logo ?? ""}
                alt={jobData[0].Company.name}
                width={48}
                height={48}
                className="rounded-full size-12"
              />

              <div className="flex flex-col">
                <h3 className="font-semibold">{jobData[0].Company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {jobData[0].Company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
