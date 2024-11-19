const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/PageEntries.vue") },
      {
        path: "settings",
        component: () => import("src/pages/PageSettings.vue"),
      },
      {
        path: "produtos",
        component: () => import("src/pages/PageProdutos.vue"),
      },
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
