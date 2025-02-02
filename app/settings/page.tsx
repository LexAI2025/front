"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { motion } from "framer-motion"
import { FileUp } from "lucide-react"

export default function SettingsPage() {
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")
  const [templates, setTemplates] = useState([
    { id: 1, name: "Commercial Lease Audit", file: null },
    { id: 2, name: "Retail Lease Review", file: null },
    { id: 3, name: "Office Lease Analysis", file: null },
  ])

  const handleTemplateUpload = (id: number, file: File) => {
    setTemplates(templates.map((template) => (template.id === id ? { ...template, file: file } : template)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#292D39] mb-2">Settings</h1>
          <p className="text-gray-600 mb-8">Manage your profile and audit preferences</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="max-w-4xl">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="audit">Audit Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24">
                      <Image
                        src={avatar || "/placeholder.svg"}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value="aude@gide.com" disabled />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <Button className="bg-[#292D39] hover:bg-[#292D39]/90">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Settings</CardTitle>
                  <CardDescription>Manage audit templates and knowledge base</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Audit Templates</h3>
                    <div className="grid gap-4">
                      {templates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between">
                          <span>{template.name}</span>
                          <div className="flex items-center space-x-2">
                            {template.file && <span className="text-sm text-green-600">File uploaded</span>}
                            <Label htmlFor={`template-${template.id}`} className="cursor-pointer">
                              <div className="flex items-center space-x-2 bg-[#292D39] text-white px-3 py-2 rounded-md hover:bg-[#292D39]/90">
                                <FileUp size={16} />
                                <span>{template.file ? "Update" : "Upload"}</span>
                              </div>
                              <Input
                                id={`template-${template.id}`}
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleTemplateUpload(template.id, e.target.files[0])
                                  }
                                }}
                              />
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline">Add New Template</Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Knowledge Base</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Permanent Knowledge</Label>
                        <Textarea placeholder="Add permanent knowledge for the AI..." className="min-h-[200px]" />
                      </div>
                      <Button className="bg-[#292D39] hover:bg-[#292D39]/90">Save Knowledge Base</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

