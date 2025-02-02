"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuditForm() {
  const [files, setFiles] = useState<File[]>([])
  const [template, setTemplate] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [auditResult, setAuditResult] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    // For demonstration, we'll just set a dummy result
    setAuditResult("This is where the AI-generated audit would appear.")
  }

  const handleExport = () => {
    // Here you would implement the export functionality
    alert("Export functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lawyer&apos;s Audit Form Generator</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Upload Commercial Leases</Label>
                <Input id="file-upload" type="file" multiple onChange={handleFileChange} className="mt-1" />
                {files.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">{files.length} file(s) selected</p>
                )}
              </div>
              <div>
                <Label htmlFor="template-select">Select Audit Template</Label>
                <Select onValueChange={setTemplate} value={template}>
                  <SelectTrigger id="template-select" className="mt-1">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="template1">Template 1</SelectItem>
                    <SelectItem value="template2">Template 2</SelectItem>
                    <SelectItem value="template3">Template 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  placeholder="Enter any additional information here..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button type="submit">Generate Audit</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audit Result</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={auditResult}
              onChange={(e) => setAuditResult(e.target.value)}
              placeholder="AI-generated audit will appear here..."
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleExport} disabled={!auditResult}>
              Export Audit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

