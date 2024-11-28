import { useUserStore } from "src/stores/user-store";

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      const useStore = useUserStore();

      !useStore.email ? next("/auth") : next();
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/PageEntries.vue") },
      {
        path: "settings",
        component: () => import("src/pages/PageSettings.vue"),
      },
      {
        path: "clientes",
        component: () => import("src/pages/PageClientes.vue"),
      },
    ],
  },

  {
    path: "/auth",
    beforeEnter: (to, from, next) => {
      const useStore = useUserStore();
      useStore.email ? next("/") : next();
    },
    component: () => import("layouts/loginLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/auth/PageLogin.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
