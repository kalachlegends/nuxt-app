import CurrencyPage from "./CurrencyPage.vue";
import CurrencyPageId from "./CurrencyPageId.vue";
export const routesCurrency = [
  {
    path: "/currency",
    component: CurrencyPage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/currency/:id",
    component: CurrencyPageId,
    meta: {
      requiresAuth: true,
    },
  },
];
