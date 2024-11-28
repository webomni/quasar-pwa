<template>
  <div>
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

  <!-- Botão para imprimir no console -->
  <div>
    <q-btn
      @click="printSelected"
      label="Imprimir Selecionado"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreCliente } from "src/stores/storeCliente";

defineOptions({
  name: "IndexPage",
});

const storeCliente = useStoreCliente();

const model = ref(null);
const options = ref(storeCliente.clientes);

const filterFn = (val, update, abort) => {
  if (val.length < 2) {
    abort();
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = storeCliente.clientes.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Função para imprimir o label e value selecionados
const printSelected = () => {
  if (model.value) {
    console.log("model.value");
    console.log(model.value);
    const client = model.value;

    console.log("client.label");
    console.log(client.label);

    console.log("client.value");
    console.log(client.value);

    storeCliente.setClient({
      nome: client.label,
      id: client.value,
    });
  } else {
    console.log("Nenhum cliente selecionado.");
  }
};
</script>
