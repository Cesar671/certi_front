import type { TextElement } from "../types/template";
import { Text} from "react-konva";
interface Props {
  element: TextElement;
  text: string;
}

export default function RenderStaticText({
  element,
  text,
}: Props) {
  return (
    <Text
      x={element.x}
      y={element.y}

      width={element.width}

      text={text}

      fontSize={element.fontSize}

      fill={element.color || "#000"}
    />
  );
}