import type { TextElement } from "../types/template";
import { useEffect, useRef } from "react";
import { Text, Transformer} from "react-konva";
interface Props {
  element: TextElement;
  text: string;
  selected: boolean;
  onResize: (width:number) => void;

  onSelect: () => void;

  onDragEnd: (
    x: number,
    y: number
  ) => void;
}

export default function RenderText({
  element,
  text,
  selected,
  onSelect,
  onDragEnd,
  onResize,
}: Props) {
    const textRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    useEffect(() => {
        if(
            selected &&
            transformerRef.current &&
            textRef.current
        ){
            transformerRef.current.nodes([
                textRef.current,
            ]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    },[selected])

  return (
    <>
    <Text
        ref={ textRef }
    x={element.x}
      y={element.y}

      width={element.width}

      text={text}

      fontSize={element.fontSize}

      fill={element.color || "#000"}

      draggable

      onClick={onSelect}

      stroke={
        selected
          ? "#3b82f6"
          : undefined
      }

      strokeWidth={
        selected
          ? 1
          : 0
      }
      onDragStart={ onSelect }
      onDragEnd={(e) => {
        onDragEnd(
          e.target.x(),
          e.target.y()
        );
      }}
      onTransformEnd={() => {
        const node = textRef.current;

        const scaleX = node.scaleX();

        const newWidth =
            node.width() * scaleX;

        node.scaleX(1);

        onResize(newWidth);
        }}
    />
    {selected && (
        <Transformer 
            ref={ transformerRef }
            enabledAnchors={[
                "middle-left",
                "middle-right"
            ]}
            keepRatio={false}
        />
    )}
    </>
  );
}