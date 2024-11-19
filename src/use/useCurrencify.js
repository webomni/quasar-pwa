import { useStoreSettings } from "src/stores/storeSettings";

const storeSettings = useStoreSettings();
/*
useCurrencify
*/
export function useCurrencify(amount) {
  // format:"+ $ 4,999.99" | "- $ 999.99"

  let posNegSymbol = "";
  if (amount > 0) {
    posNegSymbol = "+";
  } else {
    if (amount < 0) posNegSymbol = "-";
  }

  const currencySymbol = storeSettings.settings.currencySymbol;
  const amountPositive = Math.abs(amount);

  const amountFormatted = amountPositive.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`;
}
