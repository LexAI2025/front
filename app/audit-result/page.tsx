"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function AuditResult() {
  const [auditResult, setAuditResult] = useState("This is where the AI-generated audit would appear.")

  const handleExport = () => {
    // Here you would implement the export functionality
    alert("Export functionality would be implemented here")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#292D39] mb-2 text-center">Audit Result</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">Review and export your generated audit</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-[#292D39] text-white">
              <CardTitle className="text-2xl">Audit Result</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <Textarea
                value={auditResult}
                onChange={(e) => setAuditResult(e.target.value)}
                placeholder="AI-generated audit will appear here..."
                className="min-h-[400px] border-gray-300"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleExport}
                className="bg-[#292D39] hover:bg-[#292D39]/90 text-white transition-colors"
              >
                Export Audit
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

