
import { z } from "zod"


//sign up sIGN in PART

export const SignUpSchema = z.object({
    name: z.string().min(6, { message: "Name must be at least 6 characters long" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})


export const SignInSchema = SignUpSchema.pick({
    email: true,
    password: true,
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>
export type SignInSchemaType = z.infer<typeof SignInSchema>


//CREATE NEW AUTHOR

export const CreateNewAuthorSchema = z.object({
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    email: z.string().email(),
})

export type CreateNewAuthorSchemaType = z.infer<typeof CreateNewAuthorSchema>



export const CreateNewPaperSchema = z.object({
    
    title: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    publication_source: z.string(),
    publication_date: z.string(),
    url: z.string(),

    authorId: z.string(),
})

export type CreateNewPaperSchemaType = z.infer<typeof CreateNewPaperSchema>