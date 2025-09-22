import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home.tsx'
import CriarUsuario from './pages/CriarUsuario.tsx'
import AdicionarFormador from './pages/AdicionarFormador.tsx'
import CoordenadorLayout from './components/CoordenadorLayout.tsx'
import RoleProtectedLayout from './components/RoleProtectedLayout.tsx'
import DirectorLayout from './components/DirectorLayout.tsx'
import ChefeDepartamentoLayout from './components/ChefeDepartamentoLayout.tsx'
import PublicRedirect from './pages/PublicRedirect.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<App />} />
          <Route path="/" element={<PublicRedirect />} />

          <Route element={<RoleProtectedLayout allowedRoles={["CHEFEDEPARTAMENTO"]} />}>
            <Route element={<ChefeDepartamentoLayout />}>
               {/* <Route path="/home_chefe" element={<ChefeDashboard />} /> */}
              {/* <Route path="/chefe/relatorios" element={<ChefeRelatorios />} />  */}
            </Route>
          </Route>

          <Route element={<RoleProtectedLayout allowedRoles={["COORDENADOR"]} />}>
            <Route element={<CoordenadorLayout />}>
              <Route path="/home_coordenador" element={<Home />} />
              <Route path="/criar" element={<CriarUsuario />} />
              <Route path="/criar-formador" element={<AdicionarFormador />} />
            </Route>
          </Route>

          <Route element={<RoleProtectedLayout allowedRoles={["DIRECTOR"]} />}>
            <Route element={<DirectorLayout />}>
              {/* <Route path="/home_director" element={<DirectorDashboard />} /> */}
            </Route>
          </Route>

          <Route element={<RoleProtectedLayout allowedRoles={["FORMADOR"]} />}>
            {/* <Route element={<FormadorLayout />}>
              <Route path="/home_formador" element={<FormadorDashboard />} />
            </Route> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
