import ImagePage from "./ImagePage.vue";
import ImagePageId from "./ImagePageId.vue";
export const routesImage = [
  {
    path: "/image",
    component: ImagePage,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/image/:id",
    component: ImagePageId,
    meta: {
      requiresAuth: true,
    },
  },
];
