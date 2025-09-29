// main.tsx - VERSÃO CORRIGIDA
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoleProtectedLayout from "./components/RoleProtectedLayout.tsx";
import DirectorLayout from "./components/DirectorLayout.tsx";
import ChefeDepartamentoLayout from "./components/ChefeDepartamentoLayout.tsx";
import CoordenadorLayout from "./components/CoordenadorLayout.tsx";
import FormadorLayout from "./components/FormadorLayout.tsx";
import PublicRedirect from "./pages/PublicRedirect.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<App />} />
          <Route path="/" element={<PublicRedirect />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ✅ CHEFE DE DEPARTAMENTO */}
          <Route
            element={
              <RoleProtectedLayout allowedRoles={["CHEFEDEPARTAMENTO"]} />
            }
          >
            <Route path="/home_chefe" element={<ChefeDepartamentoLayout />} />
          </Route>

          {/* ✅ COORDENADOR */}
          <Route
            element={<RoleProtectedLayout allowedRoles={["COORDENADOR"]} />}
          >
            <Route path="/home_coordenador" element={<CoordenadorLayout />} />
          </Route>

          {/* ✅ DIRECTOR */}
          <Route element={<RoleProtectedLayout allowedRoles={["DIRECTOR"]} />}>
            <Route path="/home_director" element={<DirectorLayout />} />
          </Route>

          {/* ✅ FORMADOR */}
          <Route element={<RoleProtectedLayout allowedRoles={["FORMADOR"]} />}>
            <Route path="/home_formador" element={<FormadorLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
