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
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  await prisma.jobPost.create({
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
  });
}
