export const traverse = (arr, parentId) =>
  arr
    .filter((node) => node.tree_id === parentId)
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

export const parseTree = (arr) =>
  arr
    .filter(({ tree_id }) => {
      return tree_id == null;
    })
    .map((node) => ({
      ...node,
      children: traverse(arr, node.id),
    }));
