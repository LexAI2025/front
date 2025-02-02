"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Trash2 } from "lucide-react"

// This would come from your backend in a real application
const mockKnowledgeBase = [
  { id: 1, type: "Audit Example", title: "Commercial Lease Audit", content: "Example content..." },
  { id: 2, type: "Link", title: "Legal Resource", content: "https://example.com/legal-resource" },
  { id: 3, type: "Text", title: "Contract Clause", content: "This clause states that..." },
]

export default function KnowledgeBaseList() {
  const [knowledgeBase, setKnowledgeBase] = useState(mockKnowledgeBase)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredKnowledgeBase = knowledgeBase.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setKnowledgeBase(knowledgeBase.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="search"
          placeholder="Search knowledge base..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredKnowledgeBase.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.content.substring(0, 50)}...</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

