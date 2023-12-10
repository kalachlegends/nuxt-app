export const normalizeBooleanArray = (slide) => {
  if (slide == null) {
    return slide;
  } else {
    const workspace_json = slide.workspace_json;
    if (workspace_json["elements"] != undefined) {
      workspace_json.elements = workspace_json.elements.map((el) => {
        return {
          ...el,
          isLock: normalizeBoolean(el.isLock),
          selected: normalizeBoolean(el.selected),
        };
      });
    }
    const obj = {
      ...slide,
      workspace_json,
    };

    return obj;
  }
};

export const normalizeBoolean = (boolString) => {
  if (boolString == "true") return true;
  else return false;
};
