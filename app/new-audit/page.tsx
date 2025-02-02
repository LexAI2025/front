"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function NewAuditPage() {
  const [files, setFiles] = useState<File[]>([])
  const [template, setTemplate] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (files.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un fichier à téléverser.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("file", file)
    })
    formData.append("template", template)
    formData.append("additionalInfo", additionalInfo)

    try {
      console.log("Début de l'envoi du fichier...")
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      console.log("Réponse reçue:", response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log("Résultat de l'envoi:", result)

      toast({
        title: "Succès",
        description: "L'audit a été généré avec succès.",
      })

      // Rediriger vers la page des audits
      router.push("/audits")
    } catch (error) {
      console.error("Erreur lors de la génération de l'audit:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de l'audit. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#292D39] mb-2 text-center">Créer un nouvel audit</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Fournissez les informations nécessaires pour générer votre audit
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-[#292D39] text-white">
              <CardTitle className="text-2xl">Détails de l&apos;audit</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="file-upload" className="text-lg text-[#292D39]">
                    Téléverser les baux commerciaux
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="mt-1 border-gray-300"
                  />
                  {files.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">{files.length} fichier(s) sélectionné(s)</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="template-select" className="text-lg text-[#292D39]">
                    Sélectionner le modèle d&apos;audit
                  </Label>
                  <Select onValueChange={setTemplate} value={template}>
                    <SelectTrigger id="template-select" className="mt-1 border-gray-300">
                      <SelectValue placeholder="Choisir un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Audit de bail commercial</SelectItem>
                      <SelectItem value="template2">Revue de bail de détail</SelectItem>
                      <SelectItem value="template3">Analyse de bail de bureau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="additional-info" className="text-lg text-[#292D39]">
                    Informations complémentaires
                  </Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Entrez toute information supplémentaire ici..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="mt-1 border-gray-300"
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#292D39] hover:bg-[#292D39]/90 text-white transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Génération de l&apos;audit...
                    </>
                  ) : (
                    "Générer l'audit"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

