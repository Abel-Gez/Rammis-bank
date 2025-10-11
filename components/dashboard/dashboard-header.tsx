"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User, Home } from "lucide-react"
import { useUser } from "@/context/UserContext"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function DashboardHeader() {
  const { user, loading, refreshUser } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  const displayName = user?.username || "Loading..."
  const displayEmail = user?.email || "Loading..."

  const handleSignOut = async () => {
    try {
      await logout()
      await refreshUser()
      toast({ title: "Signed out" })
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error?.message || "Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <div className="bg-white relative w-42 h-14 flex items-center justify-center rounded-xl">
              <Image
                src="/logo.png"
                alt="Rammis Bank Logo"
                width={180}
                height={70}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="text-black text-bold">
                <Home className="w-4 h-4 mr-2 text-black text-bold" />
                View Website
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-rammisBlue" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={displayName} />
                    <AvatarFallback className="bg-rammisBlue text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button> */}
                <button>
                  <Avatar className="h-10 w-10 bg-rammisBlue text-white"> {displayName.charAt(0).toUpperCase()}</Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2 bg-black/5">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{displayName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {displayEmail}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onSelect={(event) => {
                    event.preventDefault()
                    handleSignOut()
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
