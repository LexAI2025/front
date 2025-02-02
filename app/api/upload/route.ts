import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

// ATTENTION: These should be environment variables
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.AWS_REGION
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !AWS_BUCKET_NAME) {
  throw new Error("Missing AWS configuration environment variables")
}

export async function POST(request: NextRequest) {
  try {
    console.log("Starting file upload process...")
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.log("No file uploaded")
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    console.log("File received:", file.name, "Size:", file.size)

    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })

    const fileBuffer = await file.arrayBuffer()

    const input = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.name}`,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    }

    console.log("Attempting to upload to S3...")
    const command = new PutObjectCommand(input)
    await client.send(command)
    console.log("S3 upload successful")

    return NextResponse.json({ message: "File uploaded successfully" })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Error uploading file", message: error.message }, { status: 500 })
  }
}

export const runtime = "edge"

