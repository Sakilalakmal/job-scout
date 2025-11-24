"use client";

import Image from "next/image";
import logo from "@/public/scout.png";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { UserTypeSelectionForm } from "./UserTypeSelectionForm";
import { CompanyForm } from "./CompanyForm";
import { JobScouterForm } from "./JobScouterForm";

type UserSelection = "company" | "jobScouter" | null;

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelection | null>(null);

  function handleUserTypeSelection(type: UserSelection) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <>
            {/* User type selection form goes here */}
            <UserTypeSelectionForm onSelectUserType={handleUserTypeSelection} />
          </>
        );
      case 2:
        return userType === "company" ? (
          <>
            <CompanyForm />
          </>
        ) : (
          <>
            <JobScouterForm/>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        {/* Logo goes here */}
        <Image src={logo} alt="logo image" width={80} height={80} />
        <h1 className="text-4xl font-bold">
          Job <span className="text-primary">Scout</span>
        </h1>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent>
          {/* Onboarding form fields go here */}

          {renderStep()}
        </CardContent>
      </Card>
    </>
  );
}
