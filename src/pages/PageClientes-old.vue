<template>
  <q-page class="flex justify-center q-ma-lg">
    <div class="">
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
            <q-item-section class="text-grey"> Não encontrado </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        label="Cliente"
        outlined
        v-model="model"
        :options="options"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> Não encontrado </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

defineOptions({
  name: "IndexPage",
});

const stringOptions = [
  { label: "Google", value: "goog" },
  { label: "Facebook", value: "fb" },
  { label: "Twitter", value: "twt" },
  { label: "Apple", value: "app" },
  { label: "Oracle - 'Desativado'", value: "ora", disable: true },
];

const model = ref(null);
const options = ref(stringOptions);

/* para usar esta pre-filtragem mudar o :options="filteredOptions"
const filteredOptions = computed(() => {
  return options.value.filter((option) => !option.disable);
}); */

const filterFn = (val, update, abort) => {
  if (val.length < 2) {
    abort();
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
