import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home.tsx'
import CriarUsuario from './pages/CriarUsuario.tsx'
import AdicionarFormador from './pages/AdicionarFormador.tsx'
import Layout from './components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<App />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/criar" element={<CriarUsuario />} />
            <Route path="/criar-formador" element={<AdicionarFormador />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
