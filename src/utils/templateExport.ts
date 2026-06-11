import type { CertificateTemplate } from "../types/template";

export const exportTemplate = (
  template: CertificateTemplate
) => {
  const json = JSON.stringify(
    template,
    null,
    2
  );

  const blob = new Blob(
    [json],
    {
      type: "application/json",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "certificate-template.json";

  link.click();

  URL.revokeObjectURL(url);
};