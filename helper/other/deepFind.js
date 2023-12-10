export function deepFind(obj, path, defaultReturn = undefined) {
  if (!obj || !path) return defaultReturn;
  var paths = path.split("."),
    current = obj,
    i;
  for (i = 0; i < paths.length; ++i) {
    let path = paths[i];

    if (path.includes("[")) {
      let index = path.replace(/.+\[/g, "").replace("]", "");
      index = Number(index);

      let normalPath = path.replace(/\[.+\]/, "");
      let newCurrent = current[normalPath][index];
      if (newCurrent == undefined) {
        return defaultReturn;
      } else {
        current = newCurrent;
      }
      continue;
    }
    if (current[paths[i]] == undefined) {
      return defaultReturn;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

window.deepFind = deepFind;
