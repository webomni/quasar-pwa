<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    right-color="negative"
    :id="`id-${entry.id}`"
    :class="
      !entry.paid
        ? useLightOrDark('bg-white', 'bg-black')
        : useLightOrDark('bg-grey-2', 'bg-grey-9')
    "
  >
    <!-- :class="[
      { 'bg-grey-2': entry.paid && !$q.dark.isActive },
      { 'bg-grey-9': entry.paid && $q.dark.isActive },
    ]" -->
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item class="row">
      <q-item-section
        class="text-weight-bold col"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike': entry.paid },
        ]"
      >
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :cover="false"
          :offset="[16, 12]"
          anchor="top left"
          v-model="entry.name"
          auto-save
          label-set="Ok"
          buttons
          v-slot="scope"
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none"
            v-select-all
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>
      <q-item-section
        side
        class="text-weight-bold relative-position col"
        :class="[useAmountColorClass(entry.amount)]"
      >
        <span :class="[{ 'text-strike': entry.paid }]">
          {{ useCurrencify(entry.amount) }}
        </span>

        <q-popup-edit
          @save="onAmountUpdate"
          :cover="false"
          :offset="[16, 12]"
          anchor="top right"
          self="top right"
          v-model="entry.amount"
          auto-save
          label-set="Ok"
          buttons
          v-slot="scope"
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none text-right"
            v-select-all
            v-model.number="scope.value"
            dense
            autofocus
            type="number"
            step="0.01"
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
          class="running-balance absolute-bottom-right"
          outline
          size="9px"
          dense=""
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>
      <q-item-section v-if="storeEntries.options.sort" side>
        <q-icon class="handle" name="reorder" color="primary" />
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
/*
imports
 */
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";
import { useStoreSettings } from "src/stores/storeSettings";
import { useCurrencify } from "src/use/useCurrencify";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useLightOrDark } from "src/use/useLightOrDark";
import vSelectAll from "src/directives/directiveSelectAll";

/*
  stores
*/
const storeEntries = useStoreEntries(),
  storeSettings = useStoreSettings();

/*
  props
*/
const props = defineProps({
  entry: {
    type: Object,
    Required: true,
  },
  index: {
    type: Number,
    Required: true,
  },
});

/*
entries
*/
const $q = useQuasar();

/**
 * Slide Items
 */
const onEntrySlideRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) {
    promptToDelete(reset);
  } else {
    storeEntries.deleteEntry(props.entry.id);
  }
};

const promptToDelete = (reset) => {
  $q.dialog({
    title: "Delete Entry",
    message: `Delete this entry?
    <div class="q-mtmd text-weight-bold ${useAmountColorClass(
      props.entry.amount
    )}">
      ${props.entry.name} : ${useCurrencify(props.entry.amount)}
      <div>`,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      label: "Cancel",
      color: "primary",
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(props.entry.id);
    })
    .onCancel(() => {
      reset();
    });
};

const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid });
  reset();
};

const onNameUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { name: value });
};
const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value });
};
</script>
