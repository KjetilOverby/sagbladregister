/* eslint-disable prefer-const */
import React from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  isToday,
  isYesterday,
  formatDistance,
} from "date-fns";
import { nb } from "date-fns/locale"; // Norsk språkstøtte

interface TimeCalcProps {
  fromDate: string | Date;
  toDate?: string | Date;
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

  // Håndter spesielle tilfeller for dagens dato og gårsdagens dato
  if (isToday(from)) {
    const diffText = formatDistance(from, to, { locale: nb, addSuffix: true });
    return `I dag, ${diffText}`;
  }

  if (isYesterday(from)) {
    return "I går";
  }

  // Beregn forskjellen i år, måneder, uker og dager
  let years = differenceInYears(to, from);
  let months = differenceInMonths(to, from) - years * 12;

  // Finn dato etter at år og måneder er trukket fra
  let adjustedDate = new Date(
    from.getFullYear() + years,
    from.getMonth() + months,
    from.getDate(),
  );

  let weeks = differenceInWeeks(to, adjustedDate);
  adjustedDate = new Date(
    adjustedDate.getFullYear(),
    adjustedDate.getMonth(),
    adjustedDate.getDate() + weeks * 7,
  );

  let days = differenceInDays(to, adjustedDate);

  // Funksjon for å håndtere entall og flertall
  const formatUnit = (value: number, singular: string, plural: string) =>
    value === 1 ? `${value} ${singular}` : `${value} ${plural}`;

  // Bygg lesbar tekst
  const parts = [];
  if (years > 0) parts.push(formatUnit(years, "år", "år"));
  if (months > 0) parts.push(formatUnit(months, "måned", "måneder"));
  if (weeks > 0) parts.push(formatUnit(weeks, "uke", "uker"));
  if (days > 0) parts.push(formatUnit(days, "dag", "dager"));

  const result = [fromTitle, parts.join(", "), toTitle]
    .filter(Boolean)
    .join(" - ");

  return result || "Under en dag";
};

export default TimeCalc;
