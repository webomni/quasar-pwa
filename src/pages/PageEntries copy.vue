<template>
  <q-page>
    <div class="q-pa-md">
      <NothingHere v-if="!storeEntries.entries.length" />

      <q-list v-else bordered separator>
        <!--  <Sortable :list="elements" item-key="id" tag="div" :options="options">
          <template #item="{ element, index }"> -->
        <!-- passando o :entry="entry" como um props -->
        <EntryComponent
          v-for="entry in storeEntries.entries"
          :key="entry.id"
          :entry="entry"
        />
        <!--   </template>
        </Sortable> -->
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <BalanceComponente />
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
