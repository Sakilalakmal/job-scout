"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CopLinkMenuItem({ jobUrl }: { jobUrl: string }) {
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(jobUrl);
     return toast.success("Job URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  }

  return (
    <DropdownMenuItem onSelect={copyToClipboard}>
      <Link2 className="size-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
}
