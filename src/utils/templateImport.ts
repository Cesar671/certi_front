import type { CertificateTemplate } from "../types/template";

export const importTemplate = (
  file: File
): Promise<CertificateTemplate> => {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        try {
          const parsed =
            JSON.parse(
              reader.result as string
            );

          resolve(parsed);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = reject;

      reader.readAsText(file);
    }
  );
};