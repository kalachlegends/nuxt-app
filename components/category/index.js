import CategoryPage from "./CategoryPage.vue";
import CategoryPageId from "./CategoryPageId.vue";
export const routesCategory = [
  {
    path: "/category",
    component: CategoryPage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/category/:id",
    component: CategoryPageId,
    meta: {
      requiresAuth: true,
    },
  },
];
