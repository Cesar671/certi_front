import {
    Stage, Layer, Text
} from "react-konva";
import type { CertificateTemplate, CertificateData } from "../types/template";
import { useMemo, useState } from "react";
import RenderText from "./RenderText";
import RenderImage from "./RenderImage";
const replaceVariables = (
  text: string,
  data: CertificateData
): string => {
  return text.replace(/{{(.*?)}}/g, (_, key) => {
    const value = key
      .trim()
      .split(".")
      .reduce((obj: any, k: string) => obj?.[k], data);

    return value?.toString() ?? "";
  });
};

const calculateFontSize = (
    text:string,
    width:number,
    baseFontSize: number,
    minFontSize = 18
) => {
    const estimatedWidth = text.length * (baseFontSize * 0.6);
    if (estimatedWidth <= width) {
        return baseFontSize;
    }
    const ratio = width / estimatedWidth;
    const newSize = Math.floor(
        baseFontSize * ratio
    );

    return Math.max(newSize, minFontSize);
}

interface Props {
  template: CertificateTemplate;

  setTemplate: React.Dispatch<
    React.SetStateAction<CertificateTemplate>
  >;

  selectedId: string | null;

  setSelectedId: (
    id: string | null
  ) => void;

  certificateData: CertificateData;
}

export default function CertificateRenderer({
  template,
  setTemplate,

  selectedId,
  setSelectedId,

  certificateData,
}: Props){
    const selectedElement =
    template.elements.find(
        (item) =>
        item.id === selectedId
    );
    const scale = useMemo(() => {
        const maxWidth = window.innerWidth - 80;

        return Math.min(
            maxWidth / template.width,
            1
        )
    },[ template.width ])
    return (
        <Stage
            width={ template.width * scale }
            height={ template.height * scale}
            scaleX={scale}
            scaleY={scale}
        >
            <Layer>
                {template.elements.map((element) => {
                    if (element.type === "text") {

                        const processedText =
                            replaceVariables(
                            element.content,
                            certificateData
                            );

                        return (
                            <RenderText
                                onResize={(width) => {
                                    setTemplate((prev) => ({
                                        ...prev,

                                        elements: prev.elements.map(
                                        (item) =>
                                            item.id === element.id
                                            ? {
                                                ...item,
                                                width,
                                                }
                                            : item
                                        ),
                                    }));
                                    }}
                                key={element.id}
                                element={element}
                                text={processedText}

                                selected={
                                    selectedId === element.id
                                }

                                onSelect={() =>
                                    setSelectedId(element.id)
                                }

                                onDragEnd={(x, y) => {
                                    setTemplate((prev) => ({
                                        ...prev,

                                        elements: prev.elements.map(
                                            (item) =>
                                            item.id === element.id
                                                ? {
                                                    ...item,
                                                    x,
                                                    y,
                                                }
                                                : item
                                        ),
                                        }));
                                }}
                            />
                        );
                        }
                   if (element.type === "image") {
                    return (
                        <RenderImage
                            selected = { selectedId === element.id }
                         onDragEnd={(x, y) => {
                            setTemplate((prev) => ({
                                ...prev,

                                elements: prev.elements.map(
                                    (item) =>
                                    item.id === element.id
                                        ? {
                                            ...item,
                                            x,
                                            y,
                                        }
                                        : item
                                ),
                                }));
                        }}
                        onDragStart = {() => { setSelectedId(element.id) }} 
                        key={element.id}
                        element={element}
                        onSelect={() => setSelectedId(element.id)}
                       onResize={(width, height) => {
                        setTemplate((prev) => ({
                            ...prev,

                            elements: prev.elements.map(
                            (item) =>
                                item.id === element.id
                                ? {
                                    ...item,
                                    width,
                                    height,
                                    }
                                : item
                            ),
                        }));
                        }}
                        />
                    );
                    }
                    return null;
                })
                }
            </Layer>
        </Stage>
    )
}