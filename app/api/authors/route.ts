'use server'

import { db } from "@/lib/prisma"
import { CreateNewAuthorSchema } from "@/lib/zod-schema"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request, res: NextResponse) {
    try {
        const authors = await db.authors.findMany()
        return NextResponse.json(authors, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'failed to load data' }, { status: 500 })
    }
}



export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const result = CreateNewAuthorSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: result.error.issues }, 
                { status: 400 }
            );
        }

        const { first_name, middle_name, last_name, email } = result.data;
        const author = await db.authors.create({
            data: {
                first_name,
                middle_name,
                last_name,
                email,
            }
        });

        return NextResponse.json(author, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'failed to create author' }, { status: 500 })
    }
}