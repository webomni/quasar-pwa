<template>
  <q-page id="registrationPage">
    <q-scroll-area class="form-style">
      <div class="text-h6 text-center q-pt-md">
        <q-img src="favicon.ico" height="60px" width="60px" />
        <div>Login</div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <div class="text-center">fazer login de teste</div>

        <q-input
          outlined
          label="E-mail"
          v-model="email"
          error-message="E-mail deve ser valido!"
          :error="errors.email"
        />

        <q-input
          outlined
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          error-message="Senha deve ter mais de 1 caractere!"
          :error="errors.password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <!-- <q-input outlined label="Password" v-model="password">
          <template v-slot:append>
            <q-icon name="close" />
          </template>
        </q-input> -->
        <div>
          <q-btn
            @click="login"
            color="primary"
            class="full-width"
            label="Login"
          />
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>
<script setup>
/**
 * imports
 */
import { reactive, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

defineOptions({
  name: "LoginPage",
});

const userStore = useUserStore();
const router = useRouter();

const isPwd = ref(true);
const email = ref("prpaulohcmg@gmail.com");
const password = ref("123456");

// validação
const errors = reactive({
  email: null,
  password: null,
});

/**
 * action
 */
const login = async () => {
  if (validation()) return "";

  // get the tokens/cookie
  await userStore.getSanctumCookie();

  // login user
  const res = await userStore.login(email.value, password.value, "eumesmo");

  console.log("res");
  console.log(res);

  if (res.success) {
    // Login casso tenha um erro na autenticação, mostrei o primeiro erro.
    if (res.data.error) {
      Notify.create({
        message: res.data.error[0],
        position: "top",
        color: "red",
      });
    } else {
      // caso contrario ira direcionar para tela inicial, isso é feito na rota
      //Redirect
      if (userStore.email) {
        router.push("/");
      }
    }
  } else {
    // Login falhou
    Notify.create({
      message: "Falha no login",
      position: "top",
      color: "red",
    });
  }
  /*  if (res.error) {
    Notify.create({
      message: "Error Login",
      position: "top",
      color: "teal",
    });
  } */

  // get the user
  //const user = await userStore.fetchUser();
  //console.log("user");
  //console.log(user);
  // userStore.setUser(user.data);
  //
};

const validation = () => {
  errors.email = email.value.length < 1 ? true : false;
  errors.password = password.value.length < 1 ? true : false;
  return errors.email || errors.password;
};

/* const login = async () => {
  try {
    await server.get("/sanctum/csrf-cookie");
    const res = server.post("login", {
      email: email.value,
      password: password.value,
      device_name: "eumesmo",
    });
    console.log(res);
    const token = res.data?.token; // Usa optional chaining

    if (token) {
      console.log("Token:", token);
      localStorage.setItem("token", token); // Armazena o token
    } else {
      console.error("Token não encontrado na resposta.");
    }

    /* const token = res.token;
    const res2 = server.get("usuarios"){
      headers: {
        Authorization: `Bearer ${token}`;
      }
    }; * /
    / *  console.log(res2); * /
  } catch (error) {
    console.log("erros: ", error);
  }
}; */
</script>

<style lang="css">
#registrationPage {
  .form-style {
    margin: 0 auto;
    height: calc(100vh - 180px);
    max-width: 500px;
  }
}
</style>
