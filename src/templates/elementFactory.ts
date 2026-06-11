import type {
  ImageElement,
  TextElement,
} from "../types/template";

export const createTextElement =
  (): TextElement => ({
    id: crypto.randomUUID(),

    type: "text",

    x: 100,
    y: 100,

    width: 400,
    fontFamily: "Arial",
    content:
      "Nuevo texto",

    fontSize: 32,

    color: "#000000",

    align: "left",
  });

export const createImageElement =
  (): ImageElement => ({
    id: crypto.randomUUID(),

    type: "image",

    x: 100,
    y: 100,

    width: 150,
    height: 150,

    src: "/logo.png",
  });