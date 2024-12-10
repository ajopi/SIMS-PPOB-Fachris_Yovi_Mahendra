import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const rupiahFormat = (number) => {
  const formatedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
  return formatedCurrency.replace(/^Rp/, "");
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };

  const result = date.toLocaleString("id-ID", options);
  return result.replace(/pukul/gi, "") + " WIB";
};
