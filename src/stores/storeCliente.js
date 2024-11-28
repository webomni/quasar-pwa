import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useStoreCliente = defineStore("cliente", () => {
  /**
   * state
   */
  const clienteSelecionado = reactive({
    nome: null,
    id: null,
  });

  const clientes = ref([
    {
      value: "1",
      label: "Paulo Henrique",
    },
    {
      value: "2",
      label: "Henrique Vieira",
    },
    {
      value: "3",
      label: "Jose Felipe",
    },
    {
      value: "3",
      label: "Felipe Abreu - Desativado",
      disable: true,
    },
    {
      value: "3",
      label: "Maria jose",
    },
  ]);

  /**
   * actions
   */

  const setClient = (client) => {
    clienteSelecionado.nome = client.nome;
    clienteSelecionado.id = client.id;
  };

  return {
    // state
    clientes,
    clienteSelecionado,

    // getters

    // actions
    setClient,
  };
});
