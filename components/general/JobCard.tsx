import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { FormatCurrency } from "@/app/utils/format-currency";
import { formatRelative } from "@/app/utils/format-relative";

interface JobCardProps {
  jobData: {
    id: string;
    Company: {
      about: string | null;
      name: string;
      location: string | null;
      logo: string | null;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    createAt: Date;
  };
}

export function JobCard({ jobData }: JobCardProps) {
  return (
    <Link href={`/job/${jobData.id}`}>
      <Card className="shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary/10">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={jobData.Company.logo ?? ""}
              alt={jobData.Company.name}
              width={52}
              height={52}
              className="size-13"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {jobData.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {jobData.Company.name}
                </p>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full" variant={"secondary"}>
                  {jobData.employmentType}
                </Badge>
                <Badge className="rounded-full">{jobData.location}</Badge>

                <p className="text-sm text-muted-foreground">
                  {FormatCurrency(jobData.salaryFrom)} -{" "}
                  {FormatCurrency(jobData.salaryTo)}
                </p>
              </div>
            </div>

            <div className="md:ml-auto text-right">
              <div className="flex items-center gap-2 justify-end">
                <MapPin className="size-4" />
                <h1>{jobData.location}</h1>
              </div>

              <p>{formatRelative(jobData.createAt)}</p>
            </div>
          </div>

          <div>
            <p className="text-base text-muted-foreground line-clamp-2">
              {jobData.Company.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
