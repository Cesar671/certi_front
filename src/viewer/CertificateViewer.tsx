import { Stage, Layer } from "react-konva";

import type { CertificateTemplate, CertificateData } from "../types/template";

import { useMemo } from "react";
import RenderStaticImage from "./RenderStaticImage";
import RenderStaticText from "./RenderStaticText";

const replaceVariables = (text: string, data: CertificateData): string => {
  return text.replace(/{{(.*?)}}/g, (_, key) => {
    const value = key
      .trim()
      .split(".")
      .reduce((obj: any, k: string) => obj?.[k], data);

    return value?.toString() ?? "";
  });
};

interface Props {
  template: CertificateTemplate;
  certificateData: CertificateData;
}

export default function CertificateViewer({
  template,
  certificateData,
}: Props) {

  const scale = useMemo(() => {
    const maxWidth = window.innerWidth - 80;

    return Math.min(maxWidth / template.width, 1);
  }, [template.width]);

  return (
    <Stage
      width={template.width * scale}
      height={template.height * scale}
      scaleX={scale}
      scaleY={scale}
    >
      <Layer>
        {template.elements.map((element) => {

          if (element.type === "text") {
            const processedText = replaceVariables(
              element.content,
              certificateData
            );

            return (
              <RenderStaticText
                key={element.id}
                element={element}
                text={processedText}
              />
            );
          }

          if (element.type === "image") {
            return (
              <RenderStaticImage
                key={element.id}
                element={element}
              />
            );
          }

          return null;
        })}
      </Layer>
    </Stage>
  );
}