'use client'
import { CreateNewAuthorSchemaType } from "@/lib/zod-schema"
import { QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"






////////// AUTHORS //////////

export const useAuthorsQuery = () => {
    return useQuery({
        queryKey: ['authors'],
        queryFn: async () => {
            const response = await axios.get("/api/authors")
            return response.data
        }
    })
}

// MUTATIONS
export const useCreateNewAuthorMutation = () => {
    const queryClient = useQueryClient()

    const router = useRouter()
    
    const mutation = useMutation({
        mutationFn: async (values: CreateNewAuthorSchemaType) => {
            const response = await axios.post("/api/authors", values)
            return response.data
        },
        onSuccess: (data) => {
            toast.success("Successfully created new author")
            queryClient.invalidateQueries({
                queryKey: ['authors']
            })
            // Navigate back to the authors list
            router.push("/admin-authors")
        },
        onError: (error: Error | AxiosError) => {
            console.error(error)
            
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Failed to create new author"
                toast.error(errorMessage)
            } else {
                toast.error("Failed to create new author")
            }
        }
    })
    
    return mutation
}