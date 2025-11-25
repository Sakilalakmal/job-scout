import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log("stripe web hook error", error);
    return new Response(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customerId = session.customer;
    const jobId = session.metadata?.jobId;

    if (!jobId) {
      return new Response("No jobId in session metadata", { status: 400 });
    }

    const company = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId as string,
      },
      select: {
        Company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!company) {
      return new Response("No company found for customer", { status: 400 });
    }

    await prisma.jobPost.update({
      where: {
        id: jobId,
        companyId: company?.Company?.id,
      },
      data: {
        status: "ACTIVE",
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
