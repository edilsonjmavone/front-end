// src/components/FormadorLayout.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStatus, useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDynamicContent } from "@/hooks/useDynamicContent";
import { CalendarPlus, Edit } from "lucide-react";

const menuItems = [
  {
    icon: CalendarPlus,
    label: "Informar Disponibilidade",
    conteudo: "informar_disponibilidade",
  },
  { icon: Edit, label: "Editar Horário", conteudo: "editar_horario_formador" },
];

const FormadorLayout = () => {
  const navigate = useNavigate();
  const { user, checking, loggedIn } = useAuthStatus();
  const { logout, loading } = useLogout();
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
            <strong>Função:</strong> Formador
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
          <h3 className="font-semibold mb-4">Menu do Formador</h3>
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

export default FormadorLayout;
