"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import KnowledgeBaseList from "@/components/KnowledgeBaseList"
import KnowledgeBaseEditor from "@/components/KnowledgeBaseEditor"

export default function KnowledgeManagerDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem("knowledgeManagerAuthenticated")
    if (authStatus !== "true") {
      router.push("/knowledge-manager/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("knowledgeManagerAuthenticated")
    // Remove the authentication cookie
    document.cookie = "knowledgeManagerAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/knowledge-manager/login")
  }

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#292D39]">Knowledge Base Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Knowledge Management Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to the Knowledge Base Management Dashboard. Here you can view, modify, and delete items in the
              knowledge base, including audit examples, links, and natural language text added by lawyers. Use this tool
              to maintain and improve the collective knowledge of the organization.
            </p>
          </CardContent>
        </Card>
        <Tabs defaultValue="view" className="space-y-4">
          <TabsList>
            <TabsTrigger value="view">View Knowledge Base</TabsTrigger>
            <TabsTrigger value="edit">Edit Knowledge Base</TabsTrigger>
          </TabsList>
          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <KnowledgeBaseList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Edit Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <KnowledgeBaseEditor />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

