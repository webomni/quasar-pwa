<template>
  <q-layout view="hHh Lpr lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="currency_exchange" />
            Money
            <span v-if="clienteSelecionado.id">
              - Cliente {{ clienteSelecionado.nome }}</span
            >
          </div>
        </q-toolbar-title>

        <q-btn
          v-if="$route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? 'Sort' : 'Done'"
          flat
          no-caps
          dense
        />
        <q-btn @click="logoff()" flat no-caps dense icon="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary"
      :width="250"
      :breakpoint="767"
    >
      <q-list>
        <q-item-label class="text-white" header> Navigation </q-item-label>

        <NavLink v-for="link in NavList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import NavLink from "src/components/Nav/NavLink.vue";
import { useStoreEntries } from "src/stores/storeEntries";
import { useLightOrDark } from "src/use/useLightOrDark";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useStoreCliente } from "src/stores/storeCliente";

defineOptions({
  name: "MainLayout",
});

const storeEntries = useStoreEntries();
const userStore = useUserStore();
const router = useRouter();
const storeCliente = useStoreCliente();

// Computed para acessar o estado do cliente selecionado
const clienteSelecionado = computed(() => storeCliente.clienteSelecionado);

const NavList = [
  {
    title: "Entries",
    icon: "savings",
    link: "/",
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
  {
    title: "Clientes",
    icon: "groups",
    link: "/clientes",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logoff = () => {
  userStore.clearUser();
  router.push("/auth");
};
</script>
