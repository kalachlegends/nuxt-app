import { inject } from "vue";
export const useConfirm = () => {
  return inject("showConfirm");
};
