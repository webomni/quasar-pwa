import { Dark } from "quasar";
/*
useCurrencify
*/
export function useLightOrDark(lightString, darString) {
  return !Dark.isActive ? lightString : darString;
}
