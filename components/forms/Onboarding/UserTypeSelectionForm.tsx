import { Button } from "@/components/ui/button";
import { Building2Icon, User2Icon } from "lucide-react";

type UserSelection = "company" | "jobScouter" | null;

interface UserTypeSelectionFormProps {
  onSelectUserType: (type: UserSelection) => void;
}

export function UserTypeSelectionForm({
  onSelectUserType,
}: UserTypeSelectionFormProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome! let started your scout</h2>
        <p className="text-muted-foreground">
          How would you like to use our platform ?
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          onClick={() => onSelectUserType("company")}
          variant={"outline"}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/10"
        >
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2Icon className="size-4 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-lg">Company/Oraganization</h3>
            <p className="text-muted-foreground text-xs">
              posts jobs and find talent scouters
            </p>
          </div>
        </Button>

        <Button
          onClick={() => onSelectUserType("jobScouter")}
          variant={"outline"}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/10"
        >
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User2Icon className="size-4 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-lg">Job Scouter</h3>
            <p className="text-muted-foreground text-xs">
              find jobs and get hired
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
