export const useSeoMetaLocal = (attrs = {}) => {
  useSeoMeta({
    title: attrs["title"] || "",
    ogTitle: attrs["title"] || "",
    description: attrs["description"] || "",
    ogDescription: attrs["description"] || "",
  });
};
