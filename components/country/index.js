import CountryPage from "./CountryPage.vue";
import CountryPageId from "./CountryPageId.vue";
export const routesCountry = [
  {
    path: "/country",
    component: CountryPage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/country/:id",
    component: CountryPageId,
    meta: {
      requiresAuth: true,
    },
  },
];
