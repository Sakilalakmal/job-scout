import { prisma } from "@/app/utils/db";
import { inngest } from "@/app/utils/inngest/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

export const sendPeriodicReport = inngest.createFunction(
  { id: "send-periodic-report" },
  { event: "report/generate" },
  async ({ event, step }) => {
    const { userId, email } = event.data;

    const totalDays = 30;

    const intervalDays = 2;

    let currentDay = 0;

    while (currentDay < totalDays) {
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays;

      const recentJobPosts = await step.run(
        "fetcing-recent-job-posts",
        async () => {
          return await prisma.jobPost.findMany({
            where: {
              status: "ACTIVE",
            },
            orderBy: {
              createAt: "desc",
            },
            take: 10,
            include: {
              Company: {
                select: {
                  name: true,
                },
              },
            },
          });
        }
      );

      if (recentJobPosts.length > 0) {
        await step.run("send-report-email", async () => {
          const jobListingHtml = recentJobPosts
            .map(
              (job) => `
      <div style="padding:16px; border:1px solid #e5e5e5; border-radius:8px; margin-bottom:20px; font-family:Arial;">

        <h2 style="margin:0; font-size:20px; color:#333;">
          ${job.jobTitle}
        </h2>

        <p style="margin:4px 0 10px 0; color:#555;">
          <strong>Company:</strong> ${job.Company.name}
        </p>

        <p style="margin:4px 0;">
          <strong>Location:</strong> ${job.location}
        </p>

        <p style="margin:4px 0;">
          <strong>Employment Type:</strong> ${job.employmentType}
        </p>

        <p style="margin:4px 0;">
          <strong>Salary:</strong> $${job.salaryFrom.toLocaleString()} - $${job.salaryTo.toLocaleString()}
        </p>

        <div style="margin-top:12px;">
          <strong>Description:</strong>
          <p style="margin:4px 0; color:#555;">
            ${job.jobDescription}
          </p>
        </div>

        <div style="margin-top:12px;">
          <strong>Benefits:</strong>
          <ul style="margin:6px 0 0 18px; color:#555;">
            ${job.benefits.map((b) => `<li>${b}</li>`).join("")}
          </ul>
        </div>

      </div>
    `
            )
            .join("");

          await resend.emails.send({
            from: "Job-scout <onboarding@resend.dev>",
            to: ["sakilalakmal77@gmail.com"],
            subject: "latest job posts for you",
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="font-size: 24px; margin-bottom: 20px; color: #333;">
        Latest Job Posts For You
      </h1>

      ${jobListingHtml}

      <p style="margin-top:20px; color:#777; font-size:14px;">
        You are receiving this email because you subscribed to job alerts.
      </p>
    </div>
  `,
          });
        });
      }
    }

    return {
      userId,
      message: "Periodic report process completed",
    };
  }
);
