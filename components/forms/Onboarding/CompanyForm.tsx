import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema, CompanySchemaType } from "@/app/utils/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/app/utils/coutries-list";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingExport";
import { createCompany } from "@/app/actions";
import { useState } from "react";
import { Computer, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CompanyForm() {
  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      website: "",
      about: "",
      location: "",
      logo: "",
      XAccount: "",
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: CompanySchemaType) {
    try {
      setPending(true);
      await createCompany(data);
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
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields go here */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your company name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      <SelectItem value="worldwide">
                        <span>🌍</span>
                        <span>worldwide / Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Locations</SelectLabel>
                      {countryList.map((country) => (
                        <SelectItem value={country.code} key={country.code}>
                          <span>{country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel> company website</FormLabel>
                <FormControl>
                  <Input placeholder="https://mycompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="XAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X Account</FormLabel>
                <FormControl>
                  <Input placeholder="@myCompany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your company..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={field.value}
                        alt="uploaded image preview"
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
                      endpoint={"imageUploader"}
                      onClientUploadComplete={(res) => {
                        field.onChange(res?.[0]?.ufsUrl ?? "");
                      }}
                      onUploadError={(error) => {
                        console.log(
                          "something wrong with image uploading",
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
  );
}
