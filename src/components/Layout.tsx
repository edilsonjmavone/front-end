import { Outlet, useNavigate } from "react-router"; // ← make sure it's "react-router-dom"
import { useEffect } from "react";
import { useAuthStatus } from "@/hooks/useAuth";
import { Button } from "./ui/button";

const Layout = () => {
    const navigate = useNavigate();
    const { user, checking, loggedIn } = useAuthStatus();

    useEffect(() => {
        if (!checking && !loggedIn) {
            navigate("/login");
        }
    }, [checking, loggedIn, navigate]);

    if (checking) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <nav className="min-h-8 p-1 w-full border flex justify-around items-center">
                <span>Gestor de  Horarios</span>
                <span><strong>Email</strong>:{user?.email}</span>
                <span><strong>Nome</strong>:{user?.nome}</span>

                <Button variant={"destructive"}  >Log out</Button>
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;
