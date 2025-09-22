// RoleProtectedLayout.tsx
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "@/hooks/useAuth";

interface RoleProtectedLayoutProps {
    allowedRoles: string[];
}

export default function RoleProtectedLayout({ allowedRoles }: RoleProtectedLayoutProps) {
    const { user, checking, loggedIn } = useAuthStatus();

    if (checking) return <p>Loading...</p>;
    if (!loggedIn) return <Navigate to="/login" replace />;
    if (!user?.role || !allowedRoles.includes(user.role.toUpperCase())) return <Navigate to="/unauthorized" replace />;

    return <Outlet />;
}
