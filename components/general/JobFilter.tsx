import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/app/utils/coutries-list";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-wrap justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filter Jobs</CardTitle>
        <Button variant={"destructive"} size={"sm"} className="h-8">
          <span>clear filters</span>
          <X className="size-4" />
        </Button>
      </CardHeader>

      <Separator />
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job type</Label>
          {/* wrapper for check boxes */}
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={job} />
                <Label className="text-sm font-medium" htmlFor={job}>
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-medium">locations</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>World wide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="pl-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((coutry) => (
                  <SelectItem key={coutry.code} value={coutry.name}>
                    <span>{coutry.flagEmoji}</span>
                    <span className="pl-2">{coutry.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
