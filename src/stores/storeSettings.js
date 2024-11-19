import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark, LocalStorage } from "quasar";

export const useStoreSettings = defineStore("settings", () => {
  /*
    state
  */

  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: true,
    currencySymbol: "$",
    darkMode: true,
  });

  // watch darkMode
  watch(
    () => settings.darkMode,
    (value) => {
      //console.log("value:", value);
      Dark.set(value);
    },
    { immediate: true }
  );

  // watch settings
  watch(settings, () => {
    saveSettings();
  });

  /*
    getters
  */

  /*
    actions
  */
  const saveSettings = () => {
    LocalStorage.set("settings", settings);
  };

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem("settings");
    if (savedSettings) {
      Object.assign(settings, savedSettings);
    }
  };

  /*
    return
  */
  return {
    // state
    settings,

    // getters
    loadSettings,

    // actions
  };
});
