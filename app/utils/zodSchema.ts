import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters long"),
  location: z.string().min(2, "Location must be at least 2 characters long"),
  about: z.string().min(10, "About must be at least 10 characters long"),
  logo: z.string().min(1, "Logo must be a valid URL").optional(),
  website: z.string().url("Website must be a valid URL").optional(),
  XAccount: z.string().optional(),
});

export type CompanySchemaType = z.infer<typeof companySchema>;
