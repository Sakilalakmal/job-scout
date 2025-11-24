/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import arcjet from "@/public/arcjet.jpg";
import inngest from "@/public/inngest.png";
import Image from "next/image";

const companies = [
  {
    id: 1,
    name: "Arcjet",
    logo: arcjet,
  },
  {
    id: 2,
    name: "Inngest",
    logo: inngest,
  },
  {
    id: 3,
    name: "Arcjet",
    logo: arcjet,
  },
  {
    id: 4,
    name: "Inngest",
    logo: inngest,
  },
];

const reviews = [
  {
    quote:
      "Our company has been using this job-finding platform for several months, and it has become one of our most reliable hiring tools. The candidate quality is consistently high, and the process is smooth from start to finish.",
    author: "Sarah",
    company: "TechCrop",
  },
  {
    quote:
      "This platform helped us speed up our hiring process significantly. The interface is simple, easy to navigate, and connects us with qualified candidates in no time.",
    author: "Michael",
    company: "BrightWorks Ltd",
  },
  {
    quote:
      "We were impressed by how efficiently we could manage job postings and applications. Everything feels well-organized, and it truly supports our HR team.",
    author: "Alicia",
    company: "NovaRise Solutions",
  },
  {
    quote:
      "The platform provided us with a wide range of talented applicants. It made shortlisting candidates faster and ensured our recruitment workflow stayed smooth.",
    author: "David",
    company: "GreenLeaf Systems",
  },
  {
    quote:
      "We appreciate the platform’s strong customer support and continuous updates. It really shows their commitment to helping companies improve their hiring experience.",
    author: "Emma",
    company: "SkyBridge Technologies",
  },
  {
    quote:
      "This job-finding platform is modern, reliable, and very effective. It helped us discover the right talent quickly and improved the overall quality of our recruitment process.",
    author: "Jonathan",
    company: "PeakEdge Innovations",
  },
];

const statistics = [
  {
    id: 1,
    value: "20+",
    label: "Monthly Active Job Scouters",
  },
  {
    id: 2,
    value: "150+",
    label: "Companies Hiring Through Our Platform",
  },
  {
    id: 3,
    value: "500+",
    label: "Job Applications Submitted Weekly",
  },
  {
    id: 4,
    value: "95%",
    label: "User Satisfaction Rate",
  },
  {
    id: 5,
    value: "80+",
    label: "New Job Listings Added Every Month",
  },
];

export default function PostJobPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Create a Job form</CardTitle>
        </CardHeader>
      </Card>

      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by industry leaders
            </CardTitle>
            <CardDescription>
              Join thousands of professionals who trust our platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* company logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {reviews.map((review, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{review.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    -{review.author}, {review.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* render stats here */}
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stats) => (
                <div
                  key={stats.id}
                  className="rounded-sm hover:rounded-lg bg-primary/10 p-4"
                >
                  <h4 className="text-2xl font-bold">{stats.value}</h4>
                  <p className="text-sm text-muted-foreground">{stats.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
