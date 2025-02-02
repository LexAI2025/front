"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
}

type Action = {
  label: string
  handler: () => void
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant virtuel pour la génération d'audits. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [auditResult, setAuditResult] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const actions: Action[] = [
    {
      label: "Générer un audit",
      handler: () =>
        handleBotResponse(
          "Certainement ! Pour générer un audit, j'aurai besoin de quelques informations. Tout d'abord, pouvez-vous me dire quel type d'audit vous souhaitez réaliser ?",
        ),
    },
    {
      label: "Voir les audits précédents",
      handler: () =>
        handleBotResponse(
          "D'accord, je vais récupérer la liste de vos audits précédents. Un instant s'il vous plaît...",
        ),
    },
    {
      label: "Aide",
      handler: () =>
        handleBotResponse(
          "Je suis là pour vous aider avec la génération d'audits. Vous pouvez me poser des questions sur le processus d'audit, me demander de générer un nouvel audit, ou de consulter vos audits précédents. Que souhaitez-vous faire ?",
        ),
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, []) //Fixed useEffect dependency

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

  const generateAudit = () => {
    // Simulate audit generation
    setTimeout(() => {
      setAuditResult(
        "Ceci est un exemple de résultat d'audit généré. Dans une vraie application, ce serait le résultat de l'analyse des documents fournis.",
      )
      handleBotResponse(
        "J'ai généré l'audit basé sur les informations fournies. Vous pouvez maintenant voir le résultat.",
      )
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Assistant d&apos;Audit</h1>
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
                      <AvatarImage src="/bot-avatar.png" alt="Bot" />
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
            <h2 className="text-xl font-semibold mb-4">Résultat de l&apos;audit</h2>
            <ScrollArea className="flex-grow">
              {auditResult ? (
                <p className="text-sm">{auditResult}</p>
              ) : (
                <p className="text-sm text-gray-500">Aucun audit généré pour le moment.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

