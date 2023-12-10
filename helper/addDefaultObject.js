import { v4 as uuidv4 } from "uuid";
import Konva from "konva";
import { copyObject } from "./copyObject";
export const styleObject = (
  zIndex = 1,
  x = 100,
  y = 100,
  width = "200px",
  height = "200px",
  backgroundColor = "rgba(0, 0, 0, 0)"
) => {
  return {
    width,
    height,
    transform: "translate(1200px, 10px)",
    zIndex,
    display: "block",
    position: "relative",
    backgroundColor,
  };
};

export const defaultObjectElement = (type, attrs = {}) => {
  console.log(attrs["zIndex"], 'attrs["zIndex"] ');
  let id = uuidv4();
  const children = attrs["children"] || [];
  const defaultObj = {
    //------------ KONVA
    rotation: 0,
    x: 0,
    y: 0,
    zIndex: attrs["zIndex"] || 0,
    scaleX: 1,
    scaleY: 1,
    type,
    draggable: true,
    visible: true,
    blurRadius: 0,
    opacity: 1,
    // filters: [Konva.Filters.Blur],
    //------------- KONVA
    children: children.map((el) => {
      return { ...el, group_id: id };
    }),
    // fill: "green",
    name: "rect2",
    color: "green",
    name: attrs["name"] || "",
    id,
    // name: uuidv4(),
    cornerRadius: [0, 0, 0, 0],
    selected: false,
    //style: styleObject(attrs["zIndex"]),
  };
  if (type == "text") {
    return {
      ...defaultObj,
      type: "text",
      padding: 0,
      lineHeight: 1,
      rect: {
        id: defaultObj.id + "rect",
        width: 120,
        height: 20,
        cornerRadius: [0, 0, 0, 0],
        fill: null,
        draggable: true,
      },

      fontSize: 20,
      align: "left",
      fontFamily: "Montserrat, sans-serif",
      width: 120,
      fill: "black",
      text: "write here",
    };
  }
  if (type == "rect") {
    return {
      ...defaultObj,
      width: 40,
      height: 40,
      name: "Rect",
      cornerRadius: 0,
      fill: "black",
    };
  }
  if (type == "image") {
    const image = new Image();
    image.src = attrs["image_url"];
    return {
      ...defaultObj,
      type: "image",
      image,
      // draggable: false,

      image_url: attrs["image_url"],
    };
  }
  if (type == "group") {
    return {
      ...defaultObj,
      type: "group",
    };
  }
  return defaultObj;
};

export const addDefaultTransaction = (transaction, type, sort_number = 0) => {
  const defaultObject = copyObject({
    name: "",
    ...transaction,
    selected: false,
  });
  if (type == "event") {
    defaultObject.for_transaction = {
      sort_number,
      id: uuidv4(),
      type,

      events: [],
      // title_transaction: "Unitled title",
      event_label: null,
    };
    return defaultObject;
  }
  if (type == "music") {
    defaultObject.options = {
      isRepeat: false,
      isEndWhenSlideEnded: false,
      isEndWhenActionEnded: false,
    };
  }
  defaultObject.for_transaction = {
    sort_number,
    id: uuidv4(),
    type,
    // title_transaction: "Unitled title",
    event_label: null,
  };
  return defaultObject;
};
export const addNewEventObject = (type, attrs) => {
  return {
    id: uuidv4(),
    type,
    // point: 100,
    label: "",
    name: "event",
    for_event: {
      action: {},
      transaction: {
        hide: {},
      },
      slide: {},
      tree: {},
      goTo: { type: null, id: null },
      labels: {
        add: [],
        delete: [],
      },

      other_settings: {},
    },
    ...attrs,
  };
};
