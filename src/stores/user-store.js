import { defineStore } from "pinia";
import { server } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    email: null,
    nome: null,
    token: null,
  }),
  getters: {
    getId: (state) => state.id,
    getEmail: (state) => state.email,
    getNome: (state) => state.nome,
    getToken: (state) => state.token,
  },
  actions: {
    async getSanctumCookie() {
      try {
        await server.get("/sanctum/csrf-cookie");
      } catch (error) {
        if (error) {
          throw error;
        }
      }
    },

    async login(email, password, device_name) {
      try {
        return await server
          .post("api/login", {
            email,
            password,
            device_name,
          })
          .then((response) => {
            console.log("1");

            console.log("response do login");
            console.log(response.data);

            // setar os dados no pinia
            this.setUser(response.data);

            return { success: true, data: response.data };
          })
          .catch((error) => {
            console.log("2");
            if (error.response) {
              // Loga a resposta completa do erro
              console.log("Erro de resposta do servidor:", error.response);
              if (error.response.status === 422) {
                console.log("Erro 422: Verifique as credenciais.");
                console.log(error.response.data); // Aqui você pode ver o conteúdo detalhado do erro
              } else {
                console.log("Erro inesperado:", error.response.data);
              }
            } else {
              console.log("Erro na conexão:", error.message);
            }
            return {
              success: false,
              error: error.response ? error.response.data : error.message,
            };
          });
      } catch (error) {
        console.log("3");
        if (error) {
          return { data: error };
        }
      }
    },

    async fetchUser() {
      try {
        const token = this.token;

        console.log(`Bearer ${token}`);

        await server
          .get("api/usuarios", {
            "Content-Type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const data = response;
            console.log("data");
            console.log(data.data);
            return data;
          })
          .catch((error) => {
            console.log("Contact offline 1!");
            console.log("erro 4 A");
            if (error) throw error;
          });
      } catch (error) {
        if (error) {
          throw error;
        }
      }
    },

    setUser(playload) {
      if (playload.id) this.id = playload.id;
      if (playload.email) this.email = playload.email;
      if (playload.nome) this.nome = playload.nome;
      if (playload.token) this.token = playload.token;
    },

    setToken(playload) {
      if (playload.token) {
        this.token = playload.token;
      }
    },

    clearUser() {
      this.id = null;
      this.email = null;
      this.nome = null;
      this.token = null;
      return true;
    },
  },
  persist: true,

  /* return {
    // state
    // getters
    // actions
  }; */
});
