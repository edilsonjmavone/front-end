// PublicRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStatus } from "@/hooks/useAuth"; // your hook

export default function PublicRedirect() {
    const { loggedIn, checking, user } = useAuthStatus();
    const navigate = useNavigate();

    useEffect(() => {
        if (!checking) {
            if (!loggedIn) {
                navigate("/login");
            } else {
                // redirect based on role
                switch (user?.role.toUpperCase()) {
                    case "CHEFEDEPARTAMENTO":
                        navigate("/home_chefe");
                        break;
                    case "COORDENADOR":
                        navigate("/home_coordenador");
                        break;
                    case "DIRECTOR":
                        navigate("/home_director");
                        break;
                    case "FORMADOR":
                        navigate("/home_formador");
                        break;
                    default:
                        navigate("/login"); // fallback
                }
            }
        }
    }, [checking, loggedIn, user, navigate]);

    return <div>Checking session...</div>; // optional loading indicator
}
