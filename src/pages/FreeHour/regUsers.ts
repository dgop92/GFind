import { AvailabilyData, getAvailabilyData, statusOptions } from "./algorithms";

type RegUser = {
  username: string;
  nickname: string;
  schedule: string;
};

type CardRegUser = RegUser & {
  availabilyData: AvailabilyData | string;
};

export const REG_USERS_KEY = "my-register-users";

export function addRegUser(user: RegUser): void {
  const item = window.localStorage.getItem(REG_USERS_KEY);
  const users: RegUser[] = item ? JSON.parse(item) : [];
  window.localStorage.setItem(REG_USERS_KEY, JSON.stringify([...users, user]));
}

export function loadRegUsers(
  indicieData: [number, number],
  searchQuery = "",
  onlyFreeUsers = true
): CardRegUser[] | string {
  if (indicieData[0] === -1 || indicieData[1] === -1) {
    return "Fuera de jornada universitaria";
  }

  const item = window.localStorage.getItem(REG_USERS_KEY);
  let users: RegUser[] = item ? JSON.parse(item) : [];

  if (searchQuery) {
    users = users.filter(
      (u) => u.username.includes(searchQuery) || u.nickname.includes(searchQuery)
    );
  }

  let cardRegUsers: CardRegUser[] = users.map((u) => ({
    ...u,
    availabilyData: getAvailabilyData(u.schedule, indicieData),
  }));

  if (onlyFreeUsers) {
    cardRegUsers = cardRegUsers.filter(
      (u) =>
        typeof u.availabilyData !== "string" &&
        u.availabilyData.status === statusOptions.FREE
    );
  }

  return cardRegUsers;
}
