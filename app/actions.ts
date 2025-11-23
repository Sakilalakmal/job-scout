"use server";

import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import { requiredUser } from "./utils/required-user";
import { companySchema, CompanySchemaType } from "./utils/zodSchema";

export async function createCompany(data: CompanySchemaType) {
  const session = await requiredUser();

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
