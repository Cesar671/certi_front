import CertificateViewer from "../viewer/CertificateViewer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { defaultTemplate } from "../templates/defaultTemplate";
import { useNavigate } from "react-router-dom";
export default function CertificatePage() {
  const nav = useNavigate();
  const downloadImage = async () => {
    const stage = document.querySelector("canvas") as HTMLCanvasElement;
    if (!stage) return;

    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = stage.toDataURL();
    link.click();
  };

  const downloadPDF = async () => {
  const { jsPDF } = await import("jspdf");

  const stage = document.querySelector("canvas") as HTMLCanvasElement;
  if (!stage) return;

  const imgData = stage.toDataURL("image/png");

  const pdf = new jsPDF("landscape", "px", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const img = new Image();
  img.src = imgData;

  img.onload = () => {
    const imgWidth = img.width;
    const imgHeight = img.height;

    const ratio = Math.min(
      pdfWidth / imgWidth,
      pdfHeight / imgHeight
    );

    const width = imgWidth * ratio;
    const height = imgHeight * ratio;

    const x = (pdfWidth - width) / 2;
    const y = (pdfHeight - height) / 2;

    pdf.addImage(imgData, "PNG", x, y, width, height);

    pdf.save("certificate.pdf");
  };
};

   const { id } = useParams();

  const [certificate, setCertificate] = useState<any>(null);

  const [template, setTemplate] =
  useState<any>(null);

  useEffect(() => {
  const fetchData = async () => {

    const certificateResponse =
      await fetch(
        "http://localhost:3000/certificates"
      );

    const certificates =
      await certificateResponse.json();

    const found =
      certificates.find(
        (c: any) => c.id === id
      );

    setCertificate(found);

    const templateResponse =
      await fetch(
        "http://localhost:3000/templates"
      );

    const templateData =
      await templateResponse.json();

    setTemplate(templateData.content);
  };

  fetchData();
}, [id]);

  if (!certificate || !template) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20, display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ 
        marginTop: 10,
        marginBottom:20, 
        display: "flex", 
        gap: 12,
        alignItems:"",
        justifyContent:"space-around",
        width:"70%"
      }}>
        <button
          onClick={ () => { nav(-1) }}
        >
          Volver
        </button>
        <div style={{display:"flex", gap:"10px"}}>
              <button onClick={downloadImage}>
                Descargar PNG
              </button>

              <button onClick={downloadPDF}>
                Descargar PDF
              </button>
        </div>
      </div>
      <CertificateViewer
        template={template}
        certificateData={certificate}
      />

      

    </div>
  );
}