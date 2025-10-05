// app/admin/layout.tsx
import { ReactNode } from "react"
import { UserProvider } from "@/context/UserContext"

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <UserProvider>{children}</UserProvider>
}
