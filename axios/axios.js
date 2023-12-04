import axios from "axios";
// Next we make an 'instance' of it
// import { useNotification } from "naive-ui";
// import { useRuntimeConfig } from "nuxt/app";
// const { VITE_BASE_URL } = useRuntimeConfig();
// console.log(VITE_BASE_URL);
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(import.meta.env.VITE_BASE_URL);
const instance = axios.create({
  // .. where we make our configurations
  baseURL,
});

// console.log(baseURL, 'baseURL');
// console.log(import.meta.env.VITE_BASE_API_URL);
// Where you would set stuff like your 'Authorization' header, etc ...

instance.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
    }
    return response;
  },
  (error) => {
    // console.log(error);
    // if (error.response.status == 502) {
    //   console.log("Сервер не доступен!");
    // }
    // if (error.response.status == 500) {
    //   console.log("Ошибка сервера.");
    // }
    return Promise.reject(error);
  }
);
export { instance as axios, baseURL };
