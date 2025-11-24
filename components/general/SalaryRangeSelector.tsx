/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { FormatCurrency } from "@/app/utils/format-currency";

interface SalaryRangeSelectorProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  currency: string;
}

export function SalaryRangeSelector({
  control,
  currency,
  maxSalary,
  minSalary,
  step,
}: SalaryRangeSelectorProps) {
  const { field: salaryFromField } = useController({
    name: "salaryFrom",
    control,
  });
  const { field: salaryToField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    salaryFromField.value || minSalary,
    salaryToField.value || maxSalary / 2,
  ]);

  function handleChange(range: number[]) {
    const newRange = [range[0], range[1]] as [number, number];
    setRange(newRange);
    salaryFromField.onChange(newRange[0]);
    salaryToField.onChange(newRange[1]);
  }

  return (
    <div className="w-full space-y-4">
      <Slider
        onValueChange={handleChange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className="flex justify-between">
        <span>{FormatCurrency(range[0], currency)}</span>
        <span>{FormatCurrency(range[1], currency)}</span>
      </div>
    </div>
  );
}
