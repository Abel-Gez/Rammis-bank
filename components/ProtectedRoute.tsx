"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";
import { apiFetch } from "@/lib/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[]; // optional: which roles can access
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        // ✅ Call backend to check user info
        const res = await apiFetch("/auth/me/", { credentials: "include" });
        if (!res.ok) throw new Error("Not authenticated");

        const user = await res.json();

        // ✅ Role-based check (if required)
        if (requiredRoles && !requiredRoles.includes(user.role)) {
          router.replace("/unauthorized");
          return;
        }

        setAuthorized(true);
      } catch (err) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router, requiredRoles]);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;

  return <>{children}</>;
}
