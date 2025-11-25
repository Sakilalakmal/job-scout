import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <X className="size-12 p-2 bg-red-500/20 rounded-full text-destructive" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-xm text-muted-foreground tracking-tight mt-4">
              Your payment was not completed. Your job post has not been
              published.
            </p>

            <Link
              href={"/"}
              className={buttonVariants({
                variant: "destructive",
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
