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

export const jobScouterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  about: z
    .string()
    .min(10, "About must be at least 10 characters long")
    .optional(),
  resume: z.string().url("Please upload your resume").optional(),
});

export type JobScouterSchemaType = z.infer<typeof jobScouterSchema>;

export const jobPostSchema = z.object({
  jobTitle: z.string().min(5, "Job title must be at least 5 characters long"),
  employmentType: z.string().min(3, "Employment type must be specified"),
  location: z.string().min(2, "Location must be at least 2 characters long"),
  salaryFrom: z.number().min(1, "Salary from must be a positive number"),
  salaryTo: z.number().min(1, "Salary to must be a positive number"),
  jobDescription: z
    .string()
    .min(5, "Job description must be at least 5 characters long"),
  listingDuration: z.number().min(1, "Listing duration must be at least 1 day"),
  benefits: z.array(z.string().min(1, "At least provide one benefits")),
  companyName: z.string().min(2, "Name must be at least 2 characters long"),
  companyLocation: z
    .string()
    .min(2, "Location must be at least 2 characters long"),
  companyAbout: z.string().min(10, "About must be at least 10 characters long"),
  companyLogo: z.string().min(1, "Logo must be a valid URL"),
  companyWebsite: z.string().url("Website must be a valid URL"),
  companyXAccount: z.string(),
});

export type JobPostSchemaType = z.infer<typeof jobPostSchema>;
