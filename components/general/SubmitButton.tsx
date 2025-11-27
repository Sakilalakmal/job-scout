"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import {  Heart, Loader } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
  pendingText?: string;
}

export function GeneralSubmitButton({
  text,
  variant,
  width,
  icon,
  pendingText = "Submitting...",
}: GeneralSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader className="size-4 animate-spin" />
          <span>{pendingText}</span>
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

export function AddToFavButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={"outline"} disabled={pending}>
      {pending ? (
        <>
          <Loader className="size-4 animate-spin" />
          <span>adding...</span>
        </>
      ) : (
        <>
          {savedJob ? (
            <>
              <Heart
                className={cn(
                  savedJob ? "fill-current text-red-500" : "",
                  "size-4"
                )}
              />
              <span>Added to Fav</span>
            </>
          ) : (
            <>
              <Heart className="size-4" />
              <span>Add To Fav</span>
            </>
          )}
        </>
      )}
    </Button>
  );
}
