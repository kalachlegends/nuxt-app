export const traverse = (arr, parentId) =>
  arr
    .filter((node) => node.parent_id === parentId)
    .reduce(
      (result, current) => [
        ...result,
        {
          ...current,
          children: traverse(arr, current.id),
        },
      ],
      []
    );

export const parseCategory = (arr) =>
  arr
    .filter(({ parent_id }) => {
      return parent_id == null;
    })
    .map((node) => ({
      ...node,
      children: traverse(arr, node.id),
    }));
