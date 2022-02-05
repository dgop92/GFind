type AvailabilyData = {
  status: string;
  previousClass: string;
  nextClass: string;
};

type IndiceData = {
  indicie: [number, number];
  errorMessage: string;
};

export const getPreviousClassMessage = (info?: string) =>
  info ? `Última clase empezó: ${info}` : "No tiene";
export const getNextClassMessage = (info?: string) =>
  info ? `Próxima clase empieza: ${info}` : "No tiene";

export const statusOptions = {
  FREE: "Libre",
  IN_CLASS: "En clase",
};

export function getSSIndiceOfCurrentData(): IndiceData {
  const currentData = new Date(Date.now());

  return {
    indicie: [-1, -1],
    errorMessage: "",
  };
}

export function getDayFromSS(ss: string, dayIndex: number) {
  return "";
}

export function getAvailabilyData(
  ss: string,
  indiceData: IndiceData
): AvailabilyData | string {
  return "";
}
