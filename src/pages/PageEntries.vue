<template>
  <q-page>
    <div class="q-pa-md">
      <transition appear enter-active-class="animated jackInTheBox ">
        <NothingHere v-if="!storeEntries.entries.length" />
      </transition>

      <q-list v-if="storeEntries.entries.length" class="entry">
        <Sortable
          @end="storeEntries.sortEnd"
          :list="storeEntries.entries"
          :options="{ handle: '.handle' }"
          item-key="id"
          tag="div"
        >
          <template #item="{ element, index }">
            <!-- passando o :entry="entry" como um props -->
            <EntryComponent :key="element.id" :entry="element" :index="index" />
          </template>
        </Sortable>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <BalanceComponente v-if="storeEntries.entries.length" />
      </transition>
      <AddEntry />
    </q-footer>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});

/*
imports
 */
import { useStoreEntries } from "src/stores/storeEntries";
import BalanceComponente from "src/components/Entries/BalanceComponente.vue";
import AddEntry from "src/components/Entries/AddEntry.vue";
import EntryComponent from "src/components/Entries/EntryComponent.vue";
import NothingHere from "src/components/Entries/NothingHere.vue";
import { Sortable } from "sortablejs-vue3";

/*
  stores
*/
const storeEntries = useStoreEntries();
</script>
