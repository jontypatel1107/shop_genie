export const HOME_ROUTE = "#/";
export const CREATE_ACCOUNT_ROUTE = "#/create-account";

export function getRoute() {
  return window.location.hash || HOME_ROUTE;
}
