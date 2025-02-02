import { NextResponse } from "next/server"
import { Document, Packer, Paragraph, TextRun } from "docx"

export async function POST(req: Request) {
  const auditData = await req.json()

  // Créez le document DOCX en utilisant les données de l'audit
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(`Audit: ${auditData.name}`),
              new TextRun(`\nDate: ${auditData.date}`),
              new TextRun(`\nStatut: ${auditData.status}`),
              new TextRun(`\nModèle: ${auditData.template}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`\n\nParties:`),
              new TextRun(`\nBailleur: ${auditData.parties.bailleur}`),
              new TextRun(`\nPreneur: ${auditData.parties.preneur}`),
            ],
          }),
          // Ajoutez d'autres paragraphes pour les autres sections de l'audit
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=${auditData.name}.docx`,
    },
  })
}

