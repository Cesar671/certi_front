import { BrowserRouter, Routes, Route } from "react-router-dom";

import CertificatesPage from "./pages/CertificatesPage";
import CertificatePage from "./pages/CertificatePage";
import CertificateTemplateEditPage from "./pages/CertificateTemplateEditPage";
import Top from "./components/Top";
export default function App() {
  return (<>
  <Top />
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<CertificatesPage />} />

        <Route
          path="/certificate/:id"
          element={<CertificatePage />}
        />

        <Route path="/edit-template"
          element={ <CertificateTemplateEditPage /> } />
      </Routes>
    </BrowserRouter>
    </>
  );
}
