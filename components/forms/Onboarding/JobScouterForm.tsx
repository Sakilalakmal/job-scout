import { jobScouterSchema, JobScouterSchemaType } from "@/app/utils/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Computer, Loader, X } from "lucide-react";
import { UploadDropzone } from "@/components/general/UploadThingExport";
import { useState } from "react";
import { createJobScouter } from "@/app/actions";
import pdfImage from "@/public/pdf.png";

export function JobScouterForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<JobScouterSchemaType>({
    resolver: zodResolver(jobScouterSchema),
    defaultValues: {
      about: "",
      name: "",
      resume: "",
    },
  });

  async function onSubmit(data: JobScouterSchemaType) {
    try {
      setPending(true);
      await createJobScouter(data);
      form.reset();
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("Failed to create company:", error.message);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* upload resume uploader with preview */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop here your resume (PDF)</FormLabel>
                <FormControl>
                  <div>
                    {field.value ? (
                      <div className="relative w-fit">
                        <Image
                          src={pdfImage}
                          alt="resume pdf"
                          width={100}
                          height={100}
                          className="object-cover rounded-lg"
                        />
                        <Button
                          onClick={() => field.onChange("")}
                          className="absolute -top-2 -right-2"
                          variant={"destructive"}
                          type="button"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <UploadDropzone
                        className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 border-primary"
                        endpoint={"pdfResumeUploader"}
                        onClientUploadComplete={(res) => {
                          field.onChange(res?.[0]?.ufsUrl ?? "");
                        }}
                        onUploadError={(error) => {
                          console.log(
                            "something wrong with resume uploading",
                            error
                          );
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
              <>
                <Loader className="size-4 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <Computer className="size-4" />
                Join with job scout
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
