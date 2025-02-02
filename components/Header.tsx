"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/")
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/audits" className="flex items-center space-x-2">
          <div className="w-8 h-8 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-onlinepngtools-XMzHTHrUzt0hUXw0nzrfyxT8BDd3di.png"
              alt="Gide Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[#292D39] text-xl font-semibold">Gide</span>
        </Link>
        {isAuthenticated && (
          <nav className="flex items-center space-x-6">
            <Link href="/new-audit" className="text-[#292D39] hover:text-[#292D39]/80 transition-colors">
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/gidebot" className="text-[#292D39] hover:text-[#292D39]/80 transition-colors">
              <Button variant="ghost">
              <Avatar>
              <AvatarImage src="https://www.shutterstock.com/image-vector/chat-bot-icon-design-robot-600nw-2476207303.jpg" />
              </Avatar>
              LexAi
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 relative rounded-full overflow-hidden">
                    <Image src="https://media.licdn.com/dms/image/v2/D4E03AQEoKp1rPO0VxQ/profile-displayphoto-shrink_200_200/B4EZR6ZCrWGYAY-/0/1737220173086?e=2147483647&v=beta&t=qR1qoAHgwjzstFvQY5BnayGVSjwPpzgVPi12evLFhYQ" alt="Profile" fill className="object-cover" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}
      </div>
    </header>
  )
}

