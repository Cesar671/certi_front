import type { CertificateTemplate } from "../types/template";

export const defaultTemplate: CertificateTemplate = {
  width: 1200,
  height: 850,

  background: "#ffffff",

  elements: [
     {
        id:"background",
        type: "image",

        x:0,
        y:0,

        width:1200,
        height:850,

        src:"/background.png"
    },
    {
        id:"background2",
        type: "image",

        x:0,
        y:0,

        width:1200,
        height:850,

        src:"/certificate1.png"
    },
    {
      id: "title",
      type: "text",

      x: 120,
      y: 200,

      align:"center",
      width: 1000,

      content: "CERTIFICADO DE ASISTENCIA",

      fontSize: 65,
      fontWeight: "lighter",
      fontFamily: "Arial",
      color: "#222222",
    },

    {
      id: "student-name",
      type: "text",

      x: 450,
      y: 300,
      autoResize:true,
      content: "{{participant.firstName}} {{participant.lastName}}.",
      minFontSize:24,
      fontSize: 52,
      fontWeight: "bold",
      fontFamily: "Arial",
      color: "#222222",
    },
    {
      id: "line",
      type: "text",

      x: 350,
      y: 300,
      autoResize:true,
      content: "________________",
      minFontSize:24,
      fontSize: 52,
      fontWeight: "bold",
      fontFamily: "Arial",
      color: "#222222",
    },
    {
        id:"description",
        type: "text",
        x:280,
        y:400,

        width:840,
        align:"center",

        content:"Por haber completado satisfactoriuamente {{participant.course.name}}",
        fontFamily: "Arial",
        fontSize:24,
        color:"#555555"
    },

    {
      id: "course",
      type: "text",

      x: 260,
      y: 450,

      content: "Completed {{participant.course.name}}",
      width:840,
      fontSize: 40,
      fontFamily: "Arial",
      color: "#266bd9",
      align:"center",
    },
    {
        id:"logo",
        type:"image",

        x: 170,
        y: 540,
        width: 140,
        height: 120,
        src:"/logo.jpg"
    },
    {
        id:"signature",
        type: "image",
        x: 760,
        y:520,

        width:180,
        height:130,
        src:"/signature.webp"
    },
    {
        id:"certificate-id",
        type:"text",
        fontFamily: "Arial",
        x:800,
        y: 720,
        width:400,
        align: "right",
        content:"{{verificationCode}}",
        fontSize:16,
        color:"#444444"
    },
    {
        id:"certificate-id2",
        type:"text",
        fontFamily: "Arial",
        x:130,
        y: 670,
        width:250,
        align: "right",
        content:"Facultad de Arquitectura y Ciencias del Hábitad",
        fontSize:20,
        color:"#444444"
    },
    {
        id:"certificate-id3",
        type:"text",
        fontFamily: "Arial",
        x: 760,
        y: 630,
        width:200,
        align: "right",
        content:"Director de la carrera",
        fontSize:20,
        color:"#444444"
    }
  ],
};