/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

interface TimeCalcProps {
  fromDate: string | Date; // Startdato (kan være en ISO-streng eller Date-objekt)
  toDate?: string | Date; // Sluttdato (valgfri, bruker dagens dato som standard)
  fromTitle?: string;
  toTitle?: string;
}

const TimeCalc: React.FC<TimeCalcProps> = ({
  fromDate,
  toDate = new Date(),
  fromTitle,
  toTitle,
}) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  // Beregn forskjeller
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const years = differenceInYears(to, from);
  const months = differenceInMonths(to, from) % 12;
  const days = differenceInDays(to, from) % 30;

  // Formatér resultatet

  const yearString = years > 0 ? `${years} år` : "";
  const monthString = months > 0 ? `${months} måneder` : "";
  const dayString = days > 0 ? `${days} dager ${toTitle ?? ""}` : "";

  const result = [fromTitle, yearString, monthString, dayString]
    .filter(Boolean)
    .join(" og ");

  return result;
};

export default TimeCalc;
