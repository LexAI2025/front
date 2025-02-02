"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
}

type Action = {
  label: string
  handler: () => void
}

export default function GideBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis LexAi, votre assistant virtuel pour l'analyse de baux et la génération d'audits. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [auditResult, setAuditResult] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const actions: Action[] = [
    { label: "Analyser un bail", handler: () => handleAnalyseBail() },
    { label: "Réaliser un audit", handler: () => handleRealisationAudit() },
    {
      label: "Aide",
      handler: () =>
        handleBotResponse(
          "Je suis là pour vous aider avec l'analyse de baux et la génération d'audits. Vous pouvez me demander d'analyser un bail, de réaliser un audit, ou me poser des questions spécifiques sur un bail. Que souhaitez-vous faire ?",
        ),
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, []) //Fixed unnecessary dependency

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: "user" }
      setMessages([...messages, newMessage])
      setInput("")
      // Simulate bot response
      setTimeout(() => {
        handleBotResponse("Je comprends. Pouvez-vous me donner plus de détails ou choisir une action spécifique ?")
      }, 1000)
    }
  }

  const handleBotResponse = (response: string) => {
    const botMessage: Message = { id: messages.length + 1, text: response, sender: "bot" }
    setMessages([...messages, botMessage])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
      handleBotResponse(`J'ai bien reçu ${e.target.files.length} fichier(s). Je vais les analyser pour vous.`)
    }
  }

  const handleAnalyseBail = () => {
    handleBotResponse(
      "Pour analyser un bail, j'ai besoin que vous téléversiez le document. Pouvez-vous le faire maintenant ?",
    )
    setTimeout(() => {
      fileInputRef.current?.click()
    }, 1000)
  }

  const handleRealisationAudit = () => {
    handleBotResponse(
      "Pour réaliser un audit, j'aurai besoin du bail ou des baux concernés, ainsi que d'informations complémentaires. Commençons par le téléversement des documents. Pouvez-vous les téléverser maintenant ?",
    )
    setTimeout(() => {
      fileInputRef.current?.click()
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">GideBot</h1>
      <div className="flex-grow flex space-x-4">
        <Card className="w-2/3 flex flex-col">
          <CardContent className="flex-grow flex flex-col p-4">
            <ScrollArea className="flex-grow mb-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="mr-2">
                      <AvatarImage src="https://www.shutterstock.com/image-vector/chat-bot-icon-design-robot-600nw-2476207303.jpg" alt="Bot" />
                      <AvatarFallback>Bot</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-2 max-w-[70%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="ml-2">
                      <AvatarImage src="/user-avatar.png" alt="User" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-grow"
              />
              <Button type="submit">Envoyer</Button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" />
              <Button type="button" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Téléverser
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="w-1/3 flex flex-col">
          <CardContent className="flex-grow flex flex-col p-4">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="space-y-2 mb-4">
              {actions.map((action, index) => (
                <Button key={index} onClick={action.handler} className="w-full">
                  {action.label}
                </Button>
              ))}
            </div>
            <h2 className="text-xl font-semibold mb-4">Fichiers téléversés</h2>
            <ScrollArea className="flex-grow mb-4">
              {files.length > 0 ? (
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm">
                      {file.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Aucun fichier téléversé pour le moment.</p>
              )}
            </ScrollArea>
            <h2 className="text-xl font-semibold mb-4">Résultat de l&apos;analyse/audit</h2>
            <ScrollArea className="flex-grow">
              {auditResult ? (
                <p className="text-sm">{auditResult}</p>
              ) : (
                <p className="text-sm text-gray-500">Aucune analyse ou audit généré pour le moment.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

