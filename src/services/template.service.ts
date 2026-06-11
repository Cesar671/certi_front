const API_URL = "http://localhost:3000/templates";

export const saveTemplate = async (
  name: string,
  content: any
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Error guardando plantilla");
  }

  return response.json();
};

export const getTemplates = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error obteniendo plantillas");
  }

  return response.json();
};