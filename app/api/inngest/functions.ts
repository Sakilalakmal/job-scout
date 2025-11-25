import { prisma } from "@/app/utils/db";
import { inngest } from "@/app/utils/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const handleJobExpiration = inngest.createFunction(
  {
    id: "handle-job-expiration",
  },
  { event: "job/created" },
  async ({ event, step }) => {
    const { jobId, listingDuration } = event.data;

    // Sleep for the listing duration (e.g., "7d", "30d", "90d")
    await step.sleep("wait-for-expiration", `${listingDuration}d`);

    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "EXPIRED",
        },
      });
    });

    return { jobId, message: "Job mark as expired" };
  }
);
