import { defineStore } from "pinia";
import { ref, computed, reactive, watch, nextTick } from "vue";
import { uid, Notify, LocalStorage } from "quasar";

export const useStoreEntries = defineStore("entries", () => {
  /*
    state
  */

  const entries = ref([
    {
      id: "id1",
      name: "Salary",
      amount: 4999.9987,
      paid: true,
    },
    {
      id: "id2",
      name: "Rent",
      amount: 999,
      paid: false,
    },
    {
      id: "id3",
      name: "Phone Teste",
      amount: -14.99,
      paid: false,
    },
    {
      id: "id4",
      name: "Unknown",
      amount: 0,
      paid: false,
    },
  ]);

  const options = reactive({
    sort: false,
  });

  watch(entries.value, () => {
    saveEntries();
  });

  /*
    getters
  */
  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount;
    }, 0);
  });

  const balancePaid = computed(() => {
    return entries.value.reduce((accumulator, { amount, paid }) => {
      return paid ? accumulator + amount : accumulator;
    }, 0);
  });

  const runningBalances = computed(() => {
    let runningBalances = [],
      currentRunningBalance = 0;

    if (entries.value.length) {
      entries.value.forEach((entry) => {
        let entryAmount = entry.amount ? entry.amount : 0;
        currentRunningBalance = currentRunningBalance + entryAmount;
        runningBalances.push(currentRunningBalance);
      });
    }

    return runningBalances;
  });

  /*
    actions
  */
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, {
      id: uid(),
      paid: false,
    });
    entries.value.push(newEntry);
  };

  const deleteEntry = (entryId) => {
    // console.log("entryId:", entryId);
    // localiza qual o index do array
    const index = getEntryIndexById(entryId);
    entries.value.splice(index, 1);
    removeSlideItemIfExists(entryId);
    Notify.create({
      message: "Entry deleted",
      position: "top",
      color: "teal",
    });
  };

  const updateEntry = (entryId, update) => {
    const index = getEntryIndexById(entryId);
    Object.assign(entries.value[index], update);
  };

  // o event ou desestruturado para pagar somente o newindex e oldIndex
  const sortEnd = ({ newIndex, oldIndex }) => {
    // recupera o item a ser movido
    const moveEntry = entries.value[oldIndex];

    // remove este da lista
    entries.value.splice(oldIndex, 1);

    // coloca o item removido na nova possição sem eliminar nem um
    entries.value.splice(newIndex, 0, moveEntry);
  };

  const saveEntries = () => {
    LocalStorage.set("entries", entries.value);
  };

  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem("entries");
    if (savedEntries) {
      Object.assign(entries.value, savedEntries);
    }
  };

  /**
   * Uma rapida solução para quando form deletar apagar o slide do DOM
   */
  const removeSlideItemIfExists = (entryId) => {
    nextTick(() => {
      const slideItem = document.querySelector(`#id-${entryId}`);
      if (slideItem) {
        slideItem.remove();
      }
    });
  };

  /*
  help
  */
  const getEntryIndexById = (entryId) => {
    return entries.value.findIndex((entry) => entry.id === entryId);
  };

  /*
    return
  */
  return {
    // state
    entries,
    options,

    // getters
    balance,
    balancePaid,
    runningBalances,

    // actions
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    loadEntries,
  };
});
