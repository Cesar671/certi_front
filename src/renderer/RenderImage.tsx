import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import type { ImageElement} from "../types/template";
import { useEffect, useRef } from "react";


export default function RenderImage({
  element,
  onSelect,
  onDragEnd,
  selected,
  onDragStart,
  onResize,
}: {
  element: ImageElement;
  onSelect: () => void;
  onDragEnd: (x:number, y:number) => void;
  onResize:(
                    width: number,
                    height: number,
                ) => void;
  selected: boolean;
  onDragStart: () => void;
}){
    const [image] = useImage(element.src)
    const imageRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);
    useEffect(() => {
    if (
        selected &&
        transformerRef.current &&
        imageRef.current
    ) {
        transformerRef.current.nodes([
        imageRef.current,
        ]);

        transformerRef.current.getLayer()?.batchDraw();
    }
    }, [selected]);
    return (
        <>        
        <Image 
            onTransformEnd={() => {
                const node = imageRef.current;

                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                const newWidth =
                    node.width() * scaleX;

                const newHeight =
                    node.height() * scaleY;

                node.scaleX(1);
                node.scaleY(1);

                onResize(
                    newWidth,
                    newHeight
                );
                
            }}
            ref={imageRef}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={(e) => {
                onDragEnd(
                    e.target.x(),
                    e.target.y()
                );
            }}
            onClick={ onSelect }
            x = {element.x}
            y = {element.y}

            width={element.width}
            height={element.height}

            image={ image }
        />
        {selected && (
            <Transformer
            ref={transformerRef}
            keepRatio={false}
            />
        )}
        </>

    )
}