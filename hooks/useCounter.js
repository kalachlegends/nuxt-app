import { ref, onMounted } from 'vue';
export const useCounter = (num = 1) => {
    const count = ref(0);
    const handleClickCount = () => count.value++;
    count.value = count.value + num;
    onMounted(() => {});
    return [count, handleClickCount];
};
