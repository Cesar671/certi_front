interface Props {
  variables: string[];

  onVariableClick: (
    variable: string
  ) => void;
}

export default function VariablesPanel({
  variables,
  onVariableClick,
}: Props) {
  return (
    <div>
      <h2>Variables</h2>

      {variables.map((variable) => (
        <div
          onClick={() =>
            onVariableClick(variable)
            }
          key={variable}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            marginBottom: "8px",
            cursor: "pointer",
          }}
        >
          {variable}
        </div>
      ))}
    </div>
  );
}