import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"



export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const paper = await db.publish_Papers.findFirst({
            where: {
                id: params.id
            },
            include: {
                Authors: true
            }
        })
        return NextResponse.json(paper, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Paper not existing" }, { status: 404 })
    }
}


export async function PATCH(
    request: NextRequest,
    { params }: {
        params: { id: string }
    },
) {
    try {
        const body = await request.json()
        const paper = await db.publish_Papers.update({
            where: { id: params.id },
            data: body
        })
        return NextResponse.json(paper, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid to update paper" }, { status: 400 })
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await db.publish_Papers.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ message: "Paper deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid to delete paper" }, { status: 400 })
    }
}