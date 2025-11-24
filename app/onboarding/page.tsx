import { OnboardingForm } from "@/components/forms/Onboarding/OnboardingForm";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { requiredUser } from "../utils/required-user";

async function CheckIfuserHasFinishedOnBoared(userId: string) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onBoardingCompleted: true,
    },
  });

  if (currentUser?.onBoardingCompleted) {
    return redirect("/");
  }
}

export default async function OnboardingPage() {
  const session = await requiredUser();

  await CheckIfuserHasFinishedOnBoared(session?.id as string);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-y-10">
      {/* Onboarding form goes here */}
      <OnboardingForm />
    </div>
  );
}
