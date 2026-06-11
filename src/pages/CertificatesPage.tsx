import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

import CertificateCard from "../components/CertificateCard";
import { mockCertificates } from "../data/mockCertificate";
import { useNavigate } from "react-router-dom";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [importedData, setImportedData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nav = useNavigate();
  const handleClickImport = () => {
    fileInputRef.current?.click();
  };

  const handleCleanImports = () => {
    setImportedData([]);
  }

  const handleSaveToBackend = async () => {
    try {
      for (const item of importedData){
        console.log(item)
        const response = await fetch("http://localhost:3000/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Error al enviar datos al backend");
      }


    }
    await handleGetData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetData = async () => {
     try {
      const response = await fetch("http://localhost:3000/certificates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al enviar datos al backend");
      }
      const data = await response.json();
      setCertificates(data);

      setImportedData([]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

 const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const data = event.target?.result;

    const workbook = XLSX.read(data, { type: "binary" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet);

    console.log("Excel convertido:", jsonData);

    const mapped = jsonData.map((row: any) => ({
      "firstName": row.firstName,
      "lastName": row.lastName,
      "ci": row.ci,
      "courseName": row.courseName,
      "startDate": row.startDate,
      "endDate": row.endDate,
      "workloadHours": Number(row.workloadHours),
    }));

    setImportedData((prev) => [...prev, ...mapped]);
  };

  reader.readAsBinaryString(file);
};
useEffect(() =>{
  handleGetData();
},[])

  return (
    <div
      style={{
        maxWidth: 1500,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <h1>Certificados</h1>

      <hr />

      <div style={{ marginTop: 16, display:"flex",
        justifyContent:"space-between",
        height: "30px",
       }}>
        <div style={{ display:"flex", gap:20 }}>
          <button onClick={handleClickImport}>
            Importar Excel
          </button>
          <button onClick={handleCleanImports}>
            Limpiar Importados
          </button>
        </div>
        

        <button
          onClick={() => { nav("/edit-template") }}
        >
          Editar Plantilla
        </button>

        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
  
  <div style={{ flex: 1, border: "1px solid #ddd", padding: 16 }}>
    
    <h2>Datos del Excel</h2>

    {importedData.length === 0 && (
      <p>No hay datos cargados</p>
    )}

    {importedData.map((item, index) => (
      <div
        key={index}
        style={{
          padding: 8,
          borderBottom: "1px solid #eee",
          fontSize: 12,
        }}
      >
        <strong>{item.firstName} {item.lastName}</strong><br />
        CI: {item.ci}<br />
        Curso: {item.courseName}<br />
        Fechas: {item.startDate} → {item.endDate}<br />
        Horas: {item.workloadHours}
      </div>
    ))}
  </div>

  <div style={{ display: "flex", alignItems: "start" }}>
    <button
      onClick={handleSaveToBackend}
      disabled={importedData.length === 0}
      style={{
        fontSize: 16,
        cursor: "pointer"
      }}
    >
      Generar
    </button>
  </div>

  <div style={{ flex: 1, border: "1px solid #ddd", padding: 16, width:500 }}>
    
    <h2>Certificados</h2>

    {certificates.length === 0 && (
      <p>No hay certificados aún</p>
    )}

    {certificates.map((certificate) => (
      <CertificateCard
        key={certificate.id}
        certificate={certificate}
      />
    ))}
  </div>

</div>
    </div>
  );
}