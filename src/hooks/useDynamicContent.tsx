// src/hooks/useDynamicContent.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useDynamicContent = () => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const carregarConteudo = async (
    conteudo: string,
    id: string | null = null
  ) => {
    setLoading(true);
    setError(null);

    console.log("🔄 INICIANDO carregarConteudo:", conteudo); // ✅ DEBUG

    try {
      // ✅ PRIMEIRO: SEMPRE USAR CONTEÚDO MOCK (REMOVA DEPOIS QUANDO API ESTIVER PRONTA)
      console.log("🎯 Usando conteúdo MOCK para:", conteudo);

      const conteudosMock: Record<string, React.ReactNode> = {
        dashboard: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
            <h1 className="text-3xl font-bold text-blue-800">
              🚀 PAINEL DO CHEFE DE DEPARTAMENTO
            </h1>
            <p className="text-lg text-blue-600">
              Bem-vindo! Sistema de gestão de horários em funcionamento.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <h3 className="font-semibold text-gray-700">Cursos Ativos</h3>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <h3 className="font-semibold text-gray-700">Turmas</h3>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <h3 className="font-semibold text-gray-700">Formadores</h3>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <h3 className="font-semibold text-gray-700">Salas</h3>
                <p className="text-2xl font-bold text-orange-600">6</p>
              </div>
            </div>
          </div>
        ),
        gerar_horarios: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border border-green-200">
            <h1 className="text-3xl font-bold text-green-800">
              📅 GERAR HORÁRIOS
            </h1>
            <p className="text-lg text-green-600">
              Gere horários automaticamente para todas as turmas.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Gerar Horário Automático
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Configurar Parâmetros
              </button>
            </div>
          </div>
        ),
        editar_horario: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg border border-yellow-200">
            <h1 className="text-3xl font-bold text-yellow-800">
              ✏️ EDITAR HORÁRIO
            </h1>
            <p className="text-lg text-yellow-600">
              Edite manualmente os horários das turmas.
            </p>
            <div className="bg-white p-4 rounded-lg border">
              <p>Interface de edição em desenvolvimento...</p>
            </div>
          </div>
        ),
        listar_horarios: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200">
            <h1 className="text-3xl font-bold text-purple-800">
              📋 LISTAR HORÁRIOS
            </h1>
            <p className="text-lg text-purple-600">
              Visualize todos os horários gerados.
            </p>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Horários das Turmas</h3>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                  Exportar PDF
                </button>
              </div>
              <p>Lista de horários será exibida aqui...</p>
            </div>
          </div>
        ),
        alocar_formadores: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-red-50 to-pink-100 rounded-lg border border-red-200">
            <h1 className="text-3xl font-bold text-red-800">
              👨‍🏫 ALOCAR FORMADORES
            </h1>
            <p className="text-lg text-red-600">
              Atribua formadores aos módulos e turmas.
            </p>
          </div>
        ),
        alocar_salas: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg border border-indigo-200">
            <h1 className="text-3xl font-bold text-indigo-800">
              🏫 ALOCAR SALAS
            </h1>
            <p className="text-lg text-indigo-600">
              Atribua salas às aulas e turmas.
            </p>
          </div>
        ),
        prioridades_alocacao: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-lg border border-teal-200">
            <h1 className="text-3xl font-bold text-teal-800">
              ⚡ PRIORIDADES DE ALOCAÇÃO
            </h1>
            <p className="text-lg text-teal-600">
              Defina as prioridades para alocação automática.
            </p>
          </div>
        ),
        calendario_academico: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border border-orange-200">
            <h1 className="text-3xl font-bold text-orange-800">
              🗓️ CALENDÁRIO ACADÊMICO
            </h1>
            <p className="text-lg text-orange-600">
              Visualize o calendário académico do departamento.
            </p>
          </div>
        ),
        listar_modulos: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800">
              📚 LISTAR MÓDULOS
            </h1>
            <p className="text-lg text-gray-600">
              Gerencie todos os módulos do departamento.
            </p>
          </div>
        ),
        listar_turmas: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-lime-50 to-green-100 rounded-lg border border-lime-200">
            <h1 className="text-3xl font-bold text-lime-800">
              👥 LISTAR TURMAS
            </h1>
            <p className="text-lg text-lime-600">
              Visualize e gerencie as turmas do departamento.
            </p>
          </div>
        ),
        listar_salas: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-rose-50 to-pink-100 rounded-lg border border-rose-200">
            <h1 className="text-3xl font-bold text-rose-800">
              🏠 LISTAR SALAS
            </h1>
            <p className="text-lg text-rose-600">
              Gerencie o inventário de salas disponíveis.
            </p>
          </div>
        ),
        informar_disponibilidade: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg border border-emerald-200">
            <h1 className="text-3xl font-bold text-emerald-800">
              ⏰ INFORMAR DISPONIBILIDADE
            </h1>
            <p className="text-lg text-emerald-600">
              Informe seus horários disponíveis para aulas.
            </p>
          </div>
        ),
        editar_horario_formador: (
          <div className="space-y-6 p-6 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg border border-amber-200">
            <h1 className="text-3xl font-bold text-amber-800">
              🕐 EDITAR MEU HORÁRIO
            </h1>
            <p className="text-lg text-amber-600">
              Ajuste seu horário pessoal de aulas.
            </p>
          </div>
        ),
      };

      const conteudoCarregado =
        conteudosMock[conteudo] || conteudosMock.dashboard;
      console.log("✅ Conteúdo carregado:", conteudo); // ✅ DEBUG
      setContent(conteudoCarregado);

      // Atualizar URL
      const newSearch = new URLSearchParams({ pagina: conteudo });
      if (id) newSearch.set("id", id);
      navigate(`?${newSearch.toString()}`, { replace: true });

      // ✅ NÃO TENTAR API POR ENQUANTO - REMOVA ESTA PARTE DEPOIS
      return;
    } catch (err) {
      console.error("❌ Erro ao carregar conteúdo:", err);
      setError("Conteúdo não disponível de momento");
      setContent(
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-xl font-semibold">❌ Erro</h2>
          <p>Conteúdo não disponível de momento</p>
        </div>
      );
    } finally {
      setLoading(false);
      console.log("🏁 Finalizado carregarConteudo"); // ✅ DEBUG
    }
  };

  useEffect(() => {
    console.log("🎬 useEffect executado - location.search:", location.search);
    const searchParams = new URLSearchParams(location.search);
    const pagina = searchParams.get("pagina") || "dashboard";
    const id = searchParams.get("id");

    console.log("📄 Página a carregar:", pagina);
    carregarConteudo(pagina, id);
  }, [location.search]);

  console.log("📊 Estado atual do hook:", {
    hasContent: !!content,
    loading,
    error,
  });

  return {
    content,
    loading,
    error,
    carregarConteudo,
  };
};
