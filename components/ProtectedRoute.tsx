"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken, clearAccessToken } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[]; // optional: specify roles allowed
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      clearAccessToken();
      setAuthorized(false);
      setLoading(false);
      toast({
        title: "Session required",
        description: "Please sign in to continue.",
        variant: "destructive",
      });
      router.replace("/login");
      return;
    }

    async function checkAuth() {
      try {
        // Fetch user info (apiFetch handles refresh automatically)
        const res = await apiFetch("/auth/me/", { credentials: "include" });

        if (!res.ok) {
          console.debug("ProtectedRoute: /auth/me/ returned not ok:", res.status);
          throw new Error("Not authenticated");
        }

        const user = await res.json();
        const userRoleRaw = (user?.role ?? "").toString();
        const userRole = userRoleRaw.trim().toLowerCase(); // normalized role

        // If backend returned a fresh access token in the user payload, store it.
        if (user?.access) {
          setAccessToken(user.access);
        }

        // If no requiredRoles provided, any authenticated user is allowed
        if (!requiredRoles || requiredRoles.length === 0) {
          setAuthorized(true);
          return;
        }

        // Normalize required roles array to lowercase
        const normReq = requiredRoles.map((r) => r.toString().trim().toLowerCase());

        // If required explicitly includes the user's role, allow
        if (userRole && normReq.includes(userRole)) {
          setAuthorized(true);
          return;
        }

        // Handle the special "staff" keyword: treat as any non-admin staff role
        if (normReq.includes("staff")) {
          // allow if user is authenticated and NOT admin
          // (adjust logic if you prefer "staff" to include admin as well)
          if (userRole && userRole !== "admin") {
            setAuthorized(true);
            return;
          }
        }

        // No match -> unauthorized
        console.debug("ProtectedRoute: user role not permitted:", { userRole, requiredRoles });
        toast({
          title: "Restricted area",
          description: "Sign in with an authorized account to continue.",
          variant: "destructive",
        });
        clearAccessToken();
        router.replace("/login");
      } catch (err) {
        console.debug("ProtectedRoute: auth check failed:", err);
        toast({
          title: "Session expired",
          description: "Please sign in again.",
          variant: "destructive",
        });
        // Clear access token and redirect to login
        clearAccessToken();
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, JSON.stringify(requiredRoles), user, userLoading]); // stringify so array changes trigger effect

  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;

  return <>{children}</>;
}
