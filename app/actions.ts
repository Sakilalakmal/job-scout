"use server";

import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import { requiredUser } from "./utils/required-user";
import {
  companySchema,
  CompanySchemaType,
  jobPostSchema,
  JobPostSchemaType,
  jobScouterSchema,
  JobScouterSchemaType,
} from "./utils/zodSchema";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListingDurations } from "./utils/job-listing-duration";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:MONITOR", "CATEGORY:SEARCH_ENGINE"],
    })
  );

export async function createCompany(data: CompanySchemaType) {
  const session = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied by Arcjet...");
  }

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session?.id,
    },
    data: {
      onBoardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validateData,
          logo: validateData.logo || null,
          website: validateData.website || null,
          XAccount: validateData.XAccount || "",
        },
      },
    },
  });
  return redirect("/");
}

export async function createJobScouter(data: JobScouterSchemaType) {
  const session = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied by Arcjet...");
  }

  const validateData = jobScouterSchema.parse(data);

  await prisma.user.update({
    where: {
      id: session?.id,
    },
    data: {
      onBoardingCompleted: true,
      userType: "JOBSCOUTER",
      JobScouter: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJobPost(data: JobPostSchemaType) {
  const user = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied by Arcjet...");
  }

  const validateData = jobPostSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user?.email || undefined,
      name: user?.name || undefined,
    });

    stripeCustomerId = customer.id;

    // update user with stripe customer id
    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        stripeCustomerId: stripeCustomerId,
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      location: validateData.location,
      employmentType: validateData.employmentType,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
      companyId: company.id,
    },
    select: {
      id: true,
    },
  });

  const pricingTiers = jobListingDurations.find(
    (tier) => tier.days === validateData.listingDuration
  );

  if (!pricingTiers) {
    throw new Error("Invalid listing duration selected.");
  }

  const stripeSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job post - ${pricingTiers.days} days`,
            description: pricingTiers.description,
            images: [
              "https://671jrfpjkr.ufs.sh/f/PrUuUBUcGdT1oXcvGIMP3zrb9B8Z650MopUWEnsaClAISghD",
            ],
          },
          currency: "USD",
          unit_amount: pricingTiers.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobId: jobPost.id,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
  });

  return redirect(stripeSession.url as string);
}
