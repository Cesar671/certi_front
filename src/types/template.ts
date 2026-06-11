export type ElementType = "text" | "image";

export interface BaseElement {
  id: string;
  type: ElementType;

  x: number;
  y: number;

  width?: number;
  height?: number;
}
export interface TextElement extends BaseElement {
  type: "text";
  autoResize?: boolean;
  minFontSize?: number;
  content: string;

  fontSize: number;
  fontFamily?: string;

  color?: string;

  fontWeight?: string;
  width?: number;
  align?: "left" | "center" | "right";
  lineHeight?: number;
  padding?:number;
}

export interface ImageElement extends BaseElement {
  type: "image";

  src: string;
}

export type TemplateElement =
  | TextElement
  | ImageElement;

export interface CertificateTemplate {
  width: number;
  height: number;

  background: string;

  elements: TemplateElement[];
}

export type CertificateData = {
  id: string;
  participant: Participant;
  issueDate: string;
  verificationCode: string;
};

export type Participant = {
  id: string;
  firstName: string;
  lastName: string;
  ci: string;
  course: Course;
};

export type Course = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  workloadsHours: number;
};