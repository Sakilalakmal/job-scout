import { deleteJobPosts } from "@/app/actions";
import { requiredUser } from "@/app/utils/required-user";
import { GeneralSubmitButton } from "@/components/general/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Params = Promise<{ jobId: string }>;

export default async function MyJobsPostdeletePage({
  params,
}: {
  params: Params;
}) {
  const { jobId } = await params;

  const user = await requiredUser();

  if (!user.id) {
    redirect("/");
  }

  return (
    <div className="mt-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Are you sure about this ?</CardTitle>
          <CardDescription>This action cannot be undone.</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end items-center gap-4">
          <Link href={"/my-jobs"} className={buttonVariants({})}>
            <ArrowLeft className="size-4" />
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";

              await deleteJobPosts(jobId);

              return redirect("/my-jobs");
            }}
          >
            <GeneralSubmitButton
              text="Delete Job"
              variant={"destructive"}
              icon={<Trash />}
              pendingText="deleting..."
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
