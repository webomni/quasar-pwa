<template>
  <q-form
    @submit="addEntryFromSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        v-select-all
        v-model="addEntryForm.name"
        outlined
        placeholder="Name"
        :bg-color="useLightOrDark('white', 'black')"
        dense
        ref="nameRef"
      />
    </div>
    <div class="col">
      <q-input
        v-select-all
        input-class="text-right"
        outlined
        v-model.number="addEntryForm.amount"
        placeholder="Amount"
        :bg-color="useLightOrDark('white', 'black')"
        dense
        type="number"
        step="0.1"
      />
    </div>
    <div class="col col-auto">
      <q-btn type="submit" color="primary" icon="add" round />
    </div>
  </q-form>
</template>
<script setup>
/*
imports
 */
import { ref, reactive } from "vue";
import { useStoreEntries } from "src/stores/storeEntries";
import vSelectAll from "src/directives/directiveSelectAll";
import { useLightOrDark } from "src/use/useLightOrDark";

const nameRef = ref(null);

/*
  stores
*/
const storeEntries = useStoreEntries();

/* object deafult */
const addEntryFormDefault = {
  name: "",
  amount: null,
};

/* add entry */
const addEntryForm = reactive({
  ...addEntryFormDefault,
});

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value.focus();
};

const addEntryFromSubmit = () => {
  storeEntries.addEntry(addEntryForm);
  addEntryFormReset();
};
</script>
