import { useState, useEffect } from "react";
import CertificateRenderer from "../renderer/CertificateRenderer";
import PropertiesPanel from "../components/PropertiesPanel";
import { defaultTemplate } from "../templates/defaultTemplate";
import { mockData } from "../templates/mockData";
import VariablesPanel from "../components/VariablesPanel";
import { exportTemplate } from "../utils/templateExport";
import { importTemplate } from "../utils/templateImport";
import { useTemplateHistory } from "../HOOK/useTemplateHistory";
import { createTextElement, createImageElement } from "../templates/elementFactory";
import { saveTemplate, getTemplates } from "../services/template.service";
const templateName = "Example Name"
export default function CertificateTemplateEditPage() {
  const {
    template,
    updateTemplate,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useTemplateHistory(defaultTemplate);
  const [availableVariables, setAvalaibleVariables] = useState<string[]>([]);
  const setTemplate = (updater: any) => {
    if (
      typeof updater ===
      "function"
    ) {
      updateTemplate(
        updater(template)
      );

      return;
    }

    updateTemplate(
      updater
    );
  };
  const [certificateData] =
    useState(mockData);
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const selectedElement =
    template.elements.find(
      (item) => item.id === selectedId
    );
  const extractPaths = (obj: any, prefix = ""): string[] => {
    let paths: string[] = [];

    for (const key in obj) {
      const value = obj[key];

      const currentPath = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        paths = [...paths, ...extractPaths(value, currentPath)];
      } else {
        paths.push(currentPath);
      }
    }

    return paths;
  };
  const handleSaveTemplate = async () => {
    try {
      const result = await saveTemplate(
        templateName,
        template
      );

      console.log(result);

      alert("Plantilla guardada");
    } catch (error) {
      console.error(error);

      alert("Error al guardar plantilla");
    }
  };
  const handlePropertyChange = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setTemplate((prev) => ({
      ...prev,

      elements: prev.elements.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                [field]: value,
              }
            : item
      ),
    }));
  };
  const handleImportTemplate =
  async (
    event: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {

      const templateData =
        await importTemplate(file);

      setTemplate(templateData);

      setSelectedId(null);

    } catch (error) {

      console.error(error);

      alert(
        "Error importing template"
      );
    }
  };
  const handleAddText = () => {

  const newElement =
    createTextElement();

  setTemplate((prev) => ({
    ...prev,

    elements: [
      ...prev.elements,
      newElement,
    ],
  }));

  setSelectedId(
    newElement.id
  );
};
const handleDeleteSelected = () => {

  if (!selectedId) {
    return;
  }

  setTemplate((prev) => ({
    ...prev,

    elements: prev.elements.filter(
      (element) =>
        element.id !== selectedId
    ),
  }));

  setSelectedId(null);
};
const handleAddImage = () => {

  const newElement =
    createImageElement();

  setTemplate((prev) => ({
    ...prev,

    elements: [
      ...prev.elements,
      newElement,
    ],
  }));

  setSelectedId(
    newElement.id
  );
};

useEffect(() => {
  const loadTemplate = async () => {
    try {
      const templateFromDb =
        await getTemplates();

      if (templateFromDb?.content) {
        setTemplate(
          templateFromDb.content
        );
        console.log("plantilla obtenida")
      }
    } catch (error) {
      console.error(error);
    }
  };

  loadTemplate();
  const paths = extractPaths(mockData)
  setAvalaibleVariables(paths);
},[])
  useEffect(() => {

  const handleKeyDown = (
    event: KeyboardEvent
  ) => {

    const isCtrl =
      event.ctrlKey ||
      event.metaKey;

    if (
      isCtrl &&
      event.key === "z"
    ) {

      event.preventDefault();

      undo();

      return;
    }

    if (
      isCtrl &&
      event.key === "y"
    ) {

      event.preventDefault();

      redo();

      return;
    }
     if (isCtrl && event.key === "Esc") {

      event.preventDefault();

      setSelectedId(null)

      return;
    }
    if (isCtrl && event.key === "Escape") {

      event.preventDefault();

      setSelectedId(null)

      return;
    }
    if (isCtrl && event.keyCode === 27) {

      event.preventDefault();

      setSelectedId(null)

      return;
    }
    if (event.key === "Delete") {

      event.preventDefault();

      handleDeleteSelected();

      return;
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };

}, [undo, redo, selectedId]);
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent:"space-between",

      }}
    >
      <div
        style={{
          width: 300,
          background: "#EEEEEE",
          padding: 20,
          borderRight: "1px solid #ddd",
          display:"flex",
          flexDirection:"column",
          overflow:"auto",
          height:"100vh",
          minWidth: 300,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            height:"100px"
          }}
        >
          <button
            onClick={handleAddText}
          >
            + Text
          </button>

          <button
            onClick={handleAddImage}
          >
            + Image
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={!selectedId}
          >
            Delete
          </button>
          <button
          disabled={!canUndo}
          onClick={undo}
        >
          Undo
        </button>

        <button
          disabled={!canRedo}
          onClick={redo}
        >
          Redo
        </button>
        </div>
        <PropertiesPanel
          element={selectedElement}
          onChange={handlePropertyChange}
        />
        <VariablesPanel
          variables={availableVariables}
          onVariableClick={(
            variable
          ) => {
            navigator.clipboard.writeText(
              `{{${variable}}}`
            );
          }}
        />
        <hr />
        <hr />

        <button onClick={handleSaveTemplate}>
          Save Template
        </button>

        <hr />


        <button
          onClick={() =>
            exportTemplate(template)
          }
        >
          Export Template
        </button>
        <hr />
        <input
        type="file"
        accept=".json"
        onChange={
          handleImportTemplate
        }
      />
      </div>
         
      <div
        style={{

          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "100%",
          padding: 40,
        }}
      >
        <CertificateRenderer
          template={template}
          setTemplate={ setTemplate }
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          certificateData = { certificateData }
        />
      </div>
    </div>
)};