// useAuth.ts (optional abstraction)
import { useEffect, useState } from "react";

export function useAuthStatus() {
    const [user, setUser] = useState<{
        id: number;
        email: string;
        pwdHash: never;
        userName: string;
        nome: string;
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

// export function useLogIn(){
//     const []
// }-------