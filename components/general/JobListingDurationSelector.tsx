import { ControllerRenderProps } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { jobListingDurations } from "@/app/utils/job-listing-duration";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface JobListingDurationSelectorProps {
  field: ControllerRenderProps;
}

export function JobListingDurationSelector({
  field,
}: JobListingDurationSelectorProps) {
  return (
    <RadioGroup
      onValueChange={(value) => field.onChange(parseInt(value))}
      value={field.value?.toString()}
    >
      <div className="flex flex-col gap-4">
        {jobListingDurations.map((duration) => (
          <div key={duration.days} className="relative">
            <RadioGroupItem
              value={duration.days.toString()}
              id={duration.days.toString()}
              className="sr-only"
            />
            <Label
              htmlFor={duration.days.toString()}
              className="flex flex-col cursor-pointer"
            >
              <Card
                className={cn(
                  "flex w-full px-4",
                  field.value === duration.days
                    ? "border-primary border-2 bg-primary/10"
                    : "hover:bg-secondary/50"
                )}
              >
                <div className="flex justify-between items-center ">
                  <div>
                    <p className="font-semibold text-lg">
                      {duration.days} days
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {duration.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <p>${duration.price}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(duration.price / duration.days).toFixed(2)}/days
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
