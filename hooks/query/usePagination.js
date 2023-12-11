import { ref } from "vue";
export const usePaginationQueryBase = (
  fetchFunction,
  data = ref([]),
  options = {}
) => {
  const pagination = ref({
    limit: options.limit || 10,
    page: options.page,
    totalPages: options.totalPages || 0,
    count: options.count || 0,
  });
  const changePage = async (page = 1, params = {}) => {
    pagination.value.page = page;
    const { data: dataResp } = await fetchFunction(
      {},
      { ...pagination.value, ...params }
    );
    data.value = dataResp.data;
    pagination.value.totalPages = Math.round(
      dataResp.count / pagination.value.limit
    );
    pagination.value.count = dataResp.count;
    return data.value;
  };
  return {
    pagination,
changePage,
    data,
  };
};
