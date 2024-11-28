<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="q-gutter-md row">
        <q-select
          label="Cliente"
          outlined
          v-model="model"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          @filter="filterFn"
          hint="Minimo 2 characters disparar a filtragem"
          style="width: 250px; padding-bottom: 32px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> Não encotrado </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";

defineOptions({
  name: "IndexPage",
});

const stringOptions = [
  { label: "Google", value: "goog" },
  { label: "Facebook", value: "fb" },
  { label: "Twitter", value: "twt" },
  { label: "Apple", value: "app" },
  { label: "Oracle", value: "ora", disable: true },
];
const model = ref(null);
const options = ref(stringOptions);

const filterFn = (val, update, abort) => {
  if (val.length < 2) {
    abort();
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
