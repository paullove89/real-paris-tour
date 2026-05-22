export const TOUR_TIMES = ["10:00", "13:00", "16:00"] as const;

export type TourTime = (typeof TOUR_TIMES)[number];

export const tourTimeOptions: Array<{ value: TourTime; label: string }> = [
  { value: "10:00", label: "10:00 AM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "16:00", label: "4:00 PM" },
];
