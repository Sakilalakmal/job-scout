import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, Copy, Folder, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getJobsDetails(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: {
      Company: {
        userId: userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createAt: true,
      Company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return data;
}

export default async function MyJobsPage() {
  const user = await auth();

  const data = await getJobsDetails(user?.user?.id as string);

  return (
    <>
      {data.length === 0 ? (
        <>
          <Empty className="border border-dashed ">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Ban className="text-primary size-10" />
              </EmptyMedia>
              <EmptyTitle>Job posts isn&apos;t available</EmptyTitle>
              <EmptyDescription>
                Your company do not have any job posts
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent></EmptyContent>
          </Empty>
        </>
      ) : (
        <>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>My Jobs</CardTitle>
              <CardDescription>
                Manage Your job listing and application in here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <Image
                          src={listing.Company.logo ?? ""}
                          alt={`${listing.Company.name} logo`}
                          width={40}
                          height={40}
                          className="rounded-full size-10"
                        />
                      </TableCell>
                      <TableCell>{listing.Company.name}</TableCell>
                      <TableCell>{listing.jobTitle}</TableCell>
                      <TableCell>
                        {listing.status.charAt(0).toUpperCase() +
                          listing.status.slice(1).toLowerCase()}
                      </TableCell>
                      <TableCell>{listing.createAt.toDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`my-job/${listing.id}/edit`}>
                                <Pencil className="size-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`my-job/${listing.id}/edit`}>
                                <Copy className="size-4" />
                                Copy job URL
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                              <Link
                                className={buttonVariants({
                                  variant: "destructive",
                                  size: "sm",
                                  className:"w-full"
                                })}
                                href={`my-job/${listing.id}/delete`}
                              >
                                <Trash className="size-4 text-white" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
