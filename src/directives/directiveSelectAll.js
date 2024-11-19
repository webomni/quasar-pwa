export default {
  // um hook do ciclo de vida que é chamado após o componente ser inserido no DOM
  mounted(el) {
    // dentro do elemento pega o input
    const input = el.querySelector("input");

    // adciona um evento de focus e se caso tem informação no campo seleciona estes dados do campo
    input.addEventListener("focus", () => {
      if (input.value.length) {
        input.select();
      }
    });
  },
};
