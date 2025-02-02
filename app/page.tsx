"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "aude@gide.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true")
      document.cookie = "isAuthenticated=true; path=/; max-age=86400" // 24 hours
      router.push("/audits")
    } else {
      setError("Invalid email or password")
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true"
    if (isAuth) {
      router.push("/audits")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-4"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto relative mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-onlinepngtools-XMzHTHrUzt0hUXw0nzrfyxT8BDd3di.png"
              alt="Gide Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#292D39]">Welcome to Gide</h1>
          <p className="text-gray-600">Sign in to access your audits</p>
        </div>
        <Card>
          <CardHeader className="bg-[#292D39] text-white">
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-[#292D39] hover:bg-[#292D39]/90">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

