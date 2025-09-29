// src/components/ChefeDepartamentoLayout.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStatus, useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDynamicContent } from "@/hooks/useDynamicContent";
import {
  CalendarPlus,
  Edit,
  CheckCheck,
  List,
  Users,
  DoorOpen,
  SortAsc,
  Calendar,
  Book,
  Users2,
  DoorClosed,
} from "lucide-react";

// ADICIONAR propriedade 'conteudo' aos menuItems
const menuItems = [
  { icon: CalendarPlus, label: "Gerar Horários", conteudo: "gerar_horarios" },
  { icon: Edit, label: "Editar Horário", conteudo: "editar_horario" },
  { icon: CheckCheck, label: "Validar Horário", conteudo: "validar_horario" },
  { icon: List, label: "Listar Horários", conteudo: "listar_horarios" },
  { icon: Users, label: "Alocar Formadores", conteudo: "alocar_formadores" },
  { icon: DoorOpen, label: "Alocar Salas", conteudo: "alocar_salas" },
  {
    icon: SortAsc,
    label: "Prioridades de Alocação",
    conteudo: "prioridades_alocacao",
  },
  {
    icon: Calendar,
    label: "Calendário Acadêmico",
    conteudo: "calendario_academico",
  },
  { icon: Book, label: "Listar Módulos", conteudo: "listar_modulos" },
  { icon: Users2, label: "Listar Turmas", conteudo: "listar_turmas" },
  { icon: DoorClosed, label: "Listar Salas", conteudo: "listar_salas" },
];

const ChefeDepartamentoLayout = () => {
  const navigate = useNavigate();
  const { user, checking, loggedIn } = useAuthStatus();
  const { logout, loading } = useLogout();

  // ADICIONAR hook de conteúdo dinâmico
  const {
    content,
    loading: contentLoading,
    carregarConteudo,
  } = useDynamicContent();

  useEffect(() => {
    if (!checking && !loggedIn) {
      navigate("/login");
    }
  }, [checking, loggedIn, navigate]);

  if (checking) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <nav className="w-full border-b bg-background p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Gestor de Horários</span>
        <div className="flex items-center gap-6 text-sm">
          <span>
            <strong>Nome:</strong> {user?.nome}
          </span>
          <span>
            <strong>Função:</strong> Chefe de Departamento
          </span>
          <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={async () => await logout()}
          >
            Log out
          </Button>
        </div>
      </nav>

      {/* Main layout: left sidebar + content */}
      <div className="flex flex-1">
        {/* Left sidebar */}
        <aside className="w-64 border-r bg-muted/30 p-4">
          <h3 className="font-semibold mb-4">Menu do Chefe de Departamento</h3>
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="space-y-1">
              {menuItems.map(({ icon: Icon, label, conteudo }, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => carregarConteudo(conteudo)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* SUBSTITUIR Outlet por conteúdo dinâmico */}
          {contentLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Carregando...</span>
            </div>
          ) : (
            content
          )}
        </main>
      </div>
    </div>
  );
};

export default ChefeDepartamentoLayout;
