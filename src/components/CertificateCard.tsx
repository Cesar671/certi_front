import { useNavigate } from "react-router-dom";

export default function CertificateCard({ certificate }: any) {

  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/certificate/${certificate.id}`);
  };

  return (
    <div style={{ 
        border: "1px solid #ddd", 
        padding: "10px", 
        marginBottom: 10, 
        display:"flex",
        gap:"10px",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
      <div>
        <h3>
          {certificate.participant.firstName}{" "}
          {certificate.participant.lastName}
        </h3>

        <p>{certificate.participant.course.name}</p>
      </div>
      

      <button onClick={handleView} style={{
        height:"50px"
      }}>
        Ver certificado
      </button>

    </div>
  );
}