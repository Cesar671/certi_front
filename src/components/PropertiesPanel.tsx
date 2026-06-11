import type { TemplateElement } from "../types/template";

interface Props {
  element?: TemplateElement;

  onChange: (
    id: string,
    field: string,
    value: string | number
  ) => void;
}

export default function PropertiesPanel({
  element,
  onChange,
}: Props) {
    const FONT_FAMILIES = [
        "Arial",
        "Times New Roman",
        "Georgia",
        "Courier New",
        "Verdana",
        "Helvetica",
        "Tahoma",
        "Trebuchet MS",
        ];
  if (!element) {
    return (
      <div>
        Selecciona un elemento
      </div>
    );
  }

  return (
    <div 
        style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"start",
            justifyContent:"start",
            gap:"5px",
        }}
    >
        <h2>Properties</h2>

        <p>ID: {element.id}</p>

        <p>Type: {element.type}</p>

        <div style={{
            display:"flex",
            gap:"10px"
        }}>
        <label>X</label>

        <input
            type="number"
            value={element.x}
            onChange={(e) =>
            onChange(
                element.id,
                "x",
                Number(e.target.value)
            )
            }
        />
        </div>

        <div style={{
            display:"flex",
            gap:"10px"
        }}>
            <label>Y</label>

            <input
                type="number"
                value={element.y}
                onChange={(e) =>
                onChange(
                    element.id,
                    "y",
                    Number(e.target.value)
                )
                }
            />
        </div>
        {"fontSize" in element && (
        <div style={{
            display:"flex",
            gap:"10px"
        }}>
            <label>Font Size</label>

            <input
            type="number"
            value={element.fontSize ?? 0}
            onChange={(e) =>
                onChange(
                element.id,
                "fontSize",
                Number(e.target.value)
                )
            }
            />
        </div>
        )}
        {"fontFamily" in element && (
  <div style={{
            display:"flex",
            gap:"10px"
        }}>
    <label>Font Family</label>

    <select
      value={element.fontFamily || "Arial"}
      onChange={(e) =>
        onChange(
          element.id,
          "fontFamily",
          e.target.value
        )
      }
    >
      {FONT_FAMILIES.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  </div>
)}
        {"color" in element && (
            <div style={{
            display:"flex",
            gap:"10px"
        }}>
                <label>Color</label>

                <input
                type="color"
                value={element.color || "#000000"}
                onChange={(e) =>
                    onChange(
                    element.id,
                    "color",
                    e.target.value
                    )
                }
                />
            </div>
            )}
        {"content" in element && (
            <div style={{
            display:"flex",
            gap:"10px"
        }}>
                <label>Content</label>

                <textarea
                style={{
                    height:"130px",
                    width:"200px",
                    resize:"none",
                }}
                value={element.content}
                onChange={(e) =>
                    onChange(
                    element.id,
                    "content",
                    e.target.value
                    )
                }
                />
               
                   
            </div>
            )}
             {"align" in element && (
                    <div style={{
            display:"flex",
            gap:"10px"
        }}>
                        <label>Align</label>

                        <select
                        value={element.align || "left"}
                        onChange={(e) =>
                            onChange(
                            element.id,
                            "align",
                            e.target.value
                            )
                        }
                        >
                        <option value="left">
                            Left
                        </option>

                        <option value="center">
                            Center
                        </option>

                        <option value="right">
                            Right
                        </option>
                        </select>
                    </div>
                    )}
             {"src" in element && (
                        <div style={{
                            display:"flex",
                            gap:"10px"
                        }}>
                            <label>Image URL</label>

                            <input
                                type="text"
                                value={element.src}
                                onChange={(e) =>
                                    onChange(
                                    element.id,
                                    "src",
                                    e.target.value
                                    )
                                }
                            />
                        </div>
                )}
        {"width" in element && (
        <div style={{
            display:"flex",
            gap:"10px"
        }}>
            <label>Width</label>

            <input
            type="number"
            value={element.width ?? 0}
            onChange={(e) =>
                onChange(
                element.id,
                "width",
                Number(e.target.value)
                )
            }
            />
        </div>
        )}

        {"height" in element && (
        <div>
            <label>Height</label>

            <input
            type="number"
            value={element.height ?? 0}
            onChange={(e) =>
                onChange(
                element.id,
                "height",
                Number(e.target.value)
                )
            }
            />
        </div>
        )}
    </div>
    );
}