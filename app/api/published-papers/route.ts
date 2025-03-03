'use server'

import { db } from "@/lib/prisma"
import { CreateNewPaperSchema } from "@/lib/zod-schema"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request, res: NextResponse) {
    try {
        const papers = await db.publish_Papers.findMany({
            include: {
                Authors: true
            }
        })
        return NextResponse.json(papers, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'failed to load data' }, { status: 500 })
    }
}



export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const result = CreateNewPaperSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: result.error.issues },
                { status: 400 }
            );
        }

        const { title, description, categories, publication_source, publication_date, url, authorId } = result.data;

        const paper = await db.publish_Papers.create({
            data: {
                title,
                description,
                categories,
                publication_source,
                publication_date,
                url,
                authorId,
            }
        })

        return NextResponse.json(paper, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'failed to create new paper' }, { status: 500 })
    }
}