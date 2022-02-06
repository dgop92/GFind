import { HOURS, DAYS_OF_WEEK } from "../../utils/constants";

type AvailabilyData = {
  status: string;
  previousClass: string;
  nextClass: string;
};

export const getPreviousClassMessage = (info?: string) =>
  info ? `Última clase empezó: ${info}` : "No tiene";
export const getNextClassMessage = (info?: string) =>
  info ? `Próxima clase empieza: ${info}` : "No tiene";

export const statusOptions = {
  FREE: "Libre",
  IN_CLASS: "En clase",
};

export function getSSIndiceOfCurrentDate(): [number, number] {
  const currentDate = new Date(Date.now());
  const currentDateMinus30min = new Date(currentDate.getTime() - 30 * 60000);
  const uniRangeOfHours = Array.from({ length: 14 }, (_, i) => i + 6);
  const currentHour = currentDateMinus30min.getHours();
  const hourIndex = uniRangeOfHours.indexOf(currentHour);
  const currentDayOfWeek = currentDate.getDay();
  // University does not have classes on sunday
  const dayIndex = currentDayOfWeek === 0 ? -1 : currentDayOfWeek - 1;
  return [hourIndex, dayIndex];
}

export function getDayFromSS(ss: string, dayIndex: number) {
  let daySlice = "";
  for (let i = 0; i < HOURS.length; i += 1) {
    daySlice += ss[i * DAYS_OF_WEEK + dayIndex];
  }
  return daySlice;
}

function getStringOfNSize(char: string, n: number) {
  return new Array(n).fill(char).join("");
}

export function getAvailabilyData(
  ss: string,
  indiceData: [number, number]
): AvailabilyData | string {
  const [hourIndex, dayIndex] = indiceData;
  const daySlice = getDayFromSS(ss, dayIndex);
  /* console.log("HEre data");
  console.log(daySlice);
  console.log(getStringOfNSize("0", 7)); */
  if (daySlice === getStringOfNSize("0", 14)) {
    return "Día libre";
  }
  if (daySlice === getStringOfNSize("1", 14)) {
    return "¿Seguro que es posible dar clases todos el día?";
  }

  const currentPos = daySlice[hourIndex];
  const status = currentPos === "0" ? statusOptions.FREE : statusOptions.IN_CLASS;

  let lastHourIndex = -1;
  for (let i = hourIndex - 1; i >= 0; i -= 1) {
    if (daySlice[i] === "1") {
      lastHourIndex = i;
      break;
    }
  }
  const previousClass =
    lastHourIndex === -1
      ? getPreviousClassMessage()
      : getPreviousClassMessage(HOURS[lastHourIndex]);

  let nextHourClass = -1;
  for (let i = hourIndex + 1; i < daySlice.length; i += 1) {
    if (daySlice[i] === "1") {
      nextHourClass = i;
      break;
    }
  }
  const nextClass =
    nextHourClass === -1
      ? getNextClassMessage()
      : getNextClassMessage(HOURS[nextHourClass]);

  return {
    status,
    previousClass,
    nextClass,
  };
}
