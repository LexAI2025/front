"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Save, CheckCircle } from "lucide-react"

export default function AuditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [audit, setAudit] = useState({
    id: params.id,
    name: "Commercial Lease Audit - 123 Main St",
    date: "2024-01-30",
    status: params.id === "new" ? "In Progress" : "Completed",
    template: "Commercial Lease Audit",
    parties: {
      bailleur: "ABC Properties",
      preneur: "XYZ Corporation",
    },
    locauxLoues: {
      adresse: "123 Main St, City, State, ZIP",
      designation: "Commercial space on ground floor",
      destination: "Retail store",
    },
    duree: {
      dateSignature: "2020-01-01",
      datePriseEffet: "2020-02-01",
      duree: "9 years",
      termeContractuel: "2029-01-31",
    },
    loyer: {
      montantAnnuel: "100000",
      paiement: "Quarterly",
      tva: "Applicable",
    },
    garanties: {
      depotGarantie: "25000",
      autresGaranties: "Bank guarantee",
    },
    travauxReparations: {
      grossesReparations: "Landlord",
      miseEnConformite: "Tenant",
    },
    comments: "This is a sample audit comment.",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAudit((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNestedInputChange = (category: string, field: string, value: string) => {
    setAudit((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    // Here you would normally send the updated data to your backend
    console.log("Saving audit:", audit)
    router.push("/audits")
  }

  const handleComplete = () => {
    setAudit((prev) => ({ ...prev, status: "Completed" }))
    // Here you would normally send the updated data to your backend
    console.log("Completing audit:", { ...audit, status: "Completed" })
    router.push("/audits")
  }

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/generate-audit-doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(audit),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `${audit.name}.docx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error("Erreur lors du téléchargement du document")
      }
    } catch (error) {
      console.error("Erreur lors de la génération du document", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#292D39] mb-2 text-center">Détails de l&apos;audit</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Visualiser et modifier les informations de l&apos;audit
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-[#292D39] text-white">
              <CardTitle className="text-2xl">{audit.name}</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <form className="space-y-6">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">Général</TabsTrigger>
                    <TabsTrigger value="parties">Parties</TabsTrigger>
                    <TabsTrigger value="locaux">Locaux Loués</TabsTrigger>
                    <TabsTrigger value="details">Détails</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom de l&apos;audit</Label>
                        <Input id="name" name="name" value={audit.name} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" name="date" type="date" value={audit.date} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="status">Statut</Label>
                        <Select
                          name="status"
                          value={audit.status}
                          onValueChange={(value) => handleInputChange({ target: { name: "status", value } } as any)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Completed">Terminé</SelectItem>
                            <SelectItem value="In Progress">En cours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="template">Modèle</Label>
                        <Input id="template" name="template" value={audit.template} onChange={handleInputChange} />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="parties" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bailleur">Bailleur</Label>
                        <Input
                          id="bailleur"
                          name="bailleur"
                          value={audit.parties.bailleur}
                          onChange={(e) => handleNestedInputChange("parties", "bailleur", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="preneur">Preneur</Label>
                        <Input
                          id="preneur"
                          name="preneur"
                          value={audit.parties.preneur}
                          onChange={(e) => handleNestedInputChange("parties", "preneur", e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="locaux" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="adresse">Adresse</Label>
                        <Input
                          id="adresse"
                          name="adresse"
                          value={audit.locauxLoues.adresse}
                          onChange={(e) => handleNestedInputChange("locauxLoues", "adresse", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="designation">Désignation</Label>
                        <Input
                          id="designation"
                          name="designation"
                          value={audit.locauxLoues.designation}
                          onChange={(e) => handleNestedInputChange("locauxLoues", "designation", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          name="destination"
                          value={audit.locauxLoues.destination}
                          onChange={(e) => handleNestedInputChange("locauxLoues", "destination", e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateSignature">Date de signature</Label>
                        <Input
                          id="dateSignature"
                          name="dateSignature"
                          type="date"
                          value={audit.duree.dateSignature}
                          onChange={(e) => handleNestedInputChange("duree", "dateSignature", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="datePriseEffet">Date de prise d'effet</Label>
                        <Input
                          id="datePriseEffet"
                          name="datePriseEffet"
                          type="date"
                          value={audit.duree.datePriseEffet}
                          onChange={(e) => handleNestedInputChange("duree", "datePriseEffet", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duree">Durée</Label>
                        <Input
                          id="duree"
                          name="duree"
                          value={audit.duree.duree}
                          onChange={(e) => handleNestedInputChange("duree", "duree", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="termeContractuel">Terme contractuel</Label>
                        <Input
                          id="termeContractuel"
                          name="termeContractuel"
                          type="date"
                          value={audit.duree.termeContractuel}
                          onChange={(e) => handleNestedInputChange("duree", "termeContractuel", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="montantAnnuel">Montant annuel du loyer</Label>
                        <Input
                          id="montantAnnuel"
                          name="montantAnnuel"
                          type="number"
                          value={audit.loyer.montantAnnuel}
                          onChange={(e) => handleNestedInputChange("loyer", "montantAnnuel", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="paiement">Paiement</Label>
                        <Select
                          name="paiement"
                          value={audit.loyer.paiement}
                          onValueChange={(value) => handleNestedInputChange("loyer", "paiement", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la fréquence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monthly">Mensuel</SelectItem>
                            <SelectItem value="Quarterly">Trimestriel</SelectItem>
                            <SelectItem value="Annually">Annuel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div>
                  <Label htmlFor="comments">Commentaires</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={audit.comments}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/audits")}>
                    Annuler
                  </Button>
                  <Button type="button" onClick={handleSave} className="bg-[#292D39] hover:bg-[#292D39]/90 text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                  <Button type="button" onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Terminer
                  </Button>
                  {audit.status === "Completed" && (
                    <Button type="button" onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

