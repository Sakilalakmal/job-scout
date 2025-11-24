import { benefits } from "@/app/utils/List-of-company-benefits";
import { Badge } from "../ui/badge";
import { be } from "zod/v4/locales";
import { ControllerRenderProps } from "react-hook-form";

interface BenefitProps {
  field: ControllerRenderProps;
}

export function CompanyBenefitSelector({ field }: BenefitProps) {
  function toggleBenefit(benefitId: string) {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);

          return (
            <Badge
              onClick={() => toggleBenefit(benefit.id)}
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105 active:scale-95 px-4 py-1.5 rounded-full"
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        your selected benefits :{" "}
        <span className="text-primary">{(field.value || []).length}</span>
      </div>
    </div>
  );
}
