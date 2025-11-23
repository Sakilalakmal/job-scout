"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Divide, Loader } from "lucide-react";
import { ReactNode } from "react";

interface GeneralSubmitButtonProps {
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  width?: string;
  icon?: ReactNode;
}

export function GeneralSubmitButton({
  text,
  variant,
  width,
  icon,
}: GeneralSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader className="size-4 animate-spin" />
          <span>login in...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}
