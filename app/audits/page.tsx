"use client"

import { useState } from "react"
import { Search, Calendar, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// This would come from your backend
const mockAudits = [
  {
    id: 1,
    name: "Commercial Lease Audit - 123 Main St",
    date: "2024-01-30",
    status: "Completed",
    template: "Commercial Lease Audit",
  },
  {
    id: 2,
    name: "Retail Space Review - Downtown Mall",
    date: "2024-01-29",
    status: "In Progress",
    template: "Retail Lease Review",
  },
  {
    id: 3,
    name: "Office Lease Analysis - Tech Hub",
    date: "2024-01-28",
    status: "Completed",
    template: "Office Lease Analysis",
  },
]

export default function AuditList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [templateFilter, setTemplateFilter] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const filteredAudits = mockAudits.filter((audit) => {
    const matchesSearch = audit.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || audit.status === statusFilter
    const matchesTemplate = templateFilter === "" || audit.template === templateFilter
    const matchesDate =
      dateRange.from && dateRange.to
        ? new Date(audit.date) >= dateRange.from && new Date(audit.date) <= dateRange.to
        : true
    return matchesSearch && matchesStatus && matchesTemplate && matchesDate
  })

  const handleDownload = (id: number) => {
    // Here you would implement the logic to generate and download the DOCX file
    console.log("Downloading audit as DOCX", id)
    // Placeholder for actual download logic
    alert(`Téléchargement de l'audit ${id} au format DOCX`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#292D39] mb-2 text-center">Liste des audits</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">Visualiser et gérer vos audits</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="search"
                placeholder="Rechercher des audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-4">
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Completed">Terminé</SelectItem>
                  <SelectItem value="In Progress">En cours</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setTemplateFilter} value={templateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par modèle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les modèles</SelectItem>
                  <SelectItem value="Commercial Lease Audit">Audit de bail commercial</SelectItem>
                  <SelectItem value="Retail Lease Review">Revue de bail de détail</SelectItem>
                  <SelectItem value="Office Lease Analysis">Analyse de bail de bureau</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Sélectionner une période</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudits.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.name}</TableCell>
                    <TableCell>{audit.date}</TableCell>
                    <TableCell>{audit.template}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          audit.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {audit.status === "Completed" ? "Terminé" : "En cours"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        className="text-[#292D39] hover:text-[#292D39]/80"
                        onClick={() => router.push(`/audit/${audit.id}`)}
                      >
                        Voir
                      </Button>
                      {audit.status === "Completed" && (
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleDownload(audit.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

