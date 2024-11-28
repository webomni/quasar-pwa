<template>
  <q-page class="flex justify-center q-ma-lg">
    <div>
      <SelectClienteComponente />
    </div>
  </q-page>
</template>

<script setup>
import SelectClienteComponente from "src/components/Entries/SelectClienteComponente.vue";

defineOptions({
  name: "IndexPage",
});
</script>
