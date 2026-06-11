import { useState } from "react";

import type { CertificateTemplate } from "../types/template";

const getTemplateFromBackend = async () => {
  const path = "http://localhost:3000/templates";
  const response = await fetch(path);
  if(response.status === 200){
    const data = await response.json();
    return data.content;
  }
  return null;
} 

export function useTemplateHistory(
  initialTemplate: CertificateTemplate | null | ""
) {
  const [history, setHistory] =
    useState([
      initialTemplate,
    ]);


  const [currentIndex,
    setCurrentIndex] =
      useState(0);

  const template =
    history[currentIndex];


  const updateTemplate = (
    newTemplate:
      CertificateTemplate
  ) => {

    const newHistory =
      history.slice(
        0,
        currentIndex + 1
      );

    newHistory.push(
      newTemplate
    );

    setHistory(newHistory);

    setCurrentIndex(
      newHistory.length - 1
    );
  };

  const undo = () => {

    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex(
      currentIndex - 1
    );
  };

  const redo = () => {

    if (
      currentIndex >=
      history.length - 1
    ) {
      return;
    }

    setCurrentIndex(
      currentIndex + 1
    );
  };

  return {
    template,

    updateTemplate,

    undo,
    redo,

    canUndo:
      currentIndex > 0,

    canRedo:
      currentIndex <
      history.length - 1,
  };
}