
import { z } from "zod"

// Sign up Schema
export const SignUpSchema = z.object({
    name: z.string().min(6, {message:"Name must be at least 6 characters long"}),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})


export const SignInSchema = SignUpSchema.pick({
    email: true,
    password: true,
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema> 
export type SignInSchemaType = z.infer<typeof SignInSchema>

// Admin Add Resource Schema - Iaadjust pa kulang sa mga hinihingi sa prisma
export const AddResourceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    publicationDate: z.date({
      required_error: "Publication date is required",
    }),
    publication_source: z.string(),
    url: z.string().url("Please enter a valid URL"),
    categories: z.array(z.string()).min(1, "Select at least one category"),
    contributors: z
      .array(
        z.object({
          id: z.string().optional(),
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Please enter a valid email"),
        }),
      )
      .min(1, "Add at least one contributor"),
    description: z.string().min(1, "Description is required").max(320),
})

export type AddResourceSchemaType = z.infer<typeof AddResourceSchema> 