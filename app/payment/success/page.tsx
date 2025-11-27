"use client";

import { useConfetti } from "@/app/utils/use-confetti";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="size-12 p-2 bg-primary rounded-full" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">
              Payment Successful! Your job post is now live.
            </h2>
            <p className="text-xm text-muted-foreground tracking-tight mt-4">
              Congratulations on your successful payment! Your job post is now
              live and visible to potential candidates.
            </p>

            <Link
              href={"/"}
              className={buttonVariants({
                className: "mt-6 w-full",
              })}
            >
              Back to home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
