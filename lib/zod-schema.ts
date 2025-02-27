
import { z } from "zod"


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