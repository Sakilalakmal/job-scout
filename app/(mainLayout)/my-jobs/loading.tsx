import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadingMyJobs() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>My jobs</CardTitle>
        <CardDescription>
          Manage Your job listing and application here
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="size-10 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[140px]" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-[180px]" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>

                <TableCell>
                  <Skeleton className="size-8 rounded-md mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
