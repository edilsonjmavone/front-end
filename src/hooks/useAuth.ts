// useAuth.ts (optional abstraction)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useAuthStatus() {
    const [user, setUser] = useState<{
        id: number;
        email: string;
        pwdHash: never;
        userName: string;
        nome: string;
        role: string;
    } | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/me", {
            credentials: "include",
            mode: "cors",
        })
            .then(res => {
                if (!res.ok) throw new Error("Not logged in");
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setChecking(false));
    }, []);

    return { user, checking, loggedIn: !!user };
}

export function useLogin(afterLoginNavigate: string = "/") {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ err: boolean, reason?: string }>({ err: false, });
    const navigate = useNavigate();

    const submitForm = async (formData: { email: string, pwd: string }) => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/login", {
                headers: { "Content-Type": "application/json" },
                mode: "cors",
                credentials: "include",
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    pwd: formData.pwd,
                }),
            });

            if (!res.ok) {
                switch (res.status) {
                    case 401:
                        setError({ err: true, reason: "Credenciais Invalidas" });
                        break;
                    case 403:
                        setError({ err: true, reason: "Acesso Negado" });
                        break;
                    default:
                        throw Error("some other")
                        break;
                }
            }
            navigate(afterLoginNavigate); // navegar para a pagina principal
            
        } catch (err) {
            setError({ err: true, reason: "Erro Interno do Servidor" });
        } finally {
            setLoading(false);
        }
    };
    return { submitForm, loading, error };
}

export function useLogout(afterLogoutNavigate: string = "/login") {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ err: boolean; reason?: string }>({ err: false });
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/logout", {
                method: "GET", // matches your backend
                mode: "cors",
                credentials: "include", // send cookies
            });

            if (!res.ok) {
                switch (res.status) {
                    case 401:
                        setError({ err: true, reason: "Não autenticado" });
                        break;
                    case 403:
                        setError({ err: true, reason: "Acesso negado" });
                        break;
                    default:
                        throw Error("some other");
                }
                return; // stop if request failed
            }
            navigate(afterLogoutNavigate);
        } catch (err) {
            setError({ err: true, reason: "Erro Interno do Servidor" });
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading, error };
}

// export function useLogIn(){
//     const []
// }-------