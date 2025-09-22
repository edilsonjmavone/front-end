import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
            <section className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Acesso não autorizado
                </h1>
                <p className="max-w-md text-base text-muted-foreground sm:text-lg">
                    Não encontramos as permissões necessárias para abrir esta página. Se acredita que isto é um
                    engano, contacte o administrador do sistema.
                </p>
            </section>
            <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
                Voltar para o início de sessão
            </Link>
        </main>
    );
}
