
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
    first_name: z.string().min(4, "First name must be at least 4 characters long"),
    middle_name: z.string().optional(),
    last_name: z.string().min(4, "Last name must be at least 4 characters long"),
    email: z.string().email(),
})

export type CreateNewAuthorSchemaType = z.infer<typeof CreateNewAuthorSchema>



export const CreateNewPaperSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    categories: z.array(z.string()).min(1, "Select at least one category"),
    publication_source: z.string().min(1, "Publication source is required"),
    publication_date: z.string().refine(
        (date) => !isNaN(Date.parse(date)), 
        { message: "Invalid date format. Use YYYY-MM-DD HH:mm:ss.SSS" }
    ),
    url: z.string().url("Invalid URL format"),
    authorId: z.string(),

})

//.uuid("Invalid author ID format") Ibalik nalang pag puwede maglagay ng uuid sa publish papers 

export type CreateNewPaperSchemaType = z.infer<typeof CreateNewPaperSchema>