interface JobListingDuration {
  days: number;
  price: number;
  description: string;
}

export const jobListingDurations: JobListingDuration[] = [
  {
    days: 7,
    price: 99,
    description: "Standard listing for 7 days",
  },
    {
    days: 30,
    price: 179,
    description: "Extended listing for 30 days",
  },
     {
    days: 90,
    price: 289,
    description: "Maximum visibility for 90 days",
  },
];
