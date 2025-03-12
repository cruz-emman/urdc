'use client'
import { CreateNewAuthorSchemaType, CreateNewPaperSchemaType, UpdateNewPaperSchemaType } from "@/lib/zod-schema"
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




//PUBLISH DATA 

export const usePapersQuery = () => {
    return useQuery({
        queryKey: ['papers'],
        queryFn: async () => {
            const response = await axios.get('/api/published-papers')
            return response.data
        }
    })
}


export const useGetSinglePaperQuery = (id:string | string[]) => {
    return useQuery({
        queryKey: ['papers', id],
        queryFn: async () => {
            const respone = await axios.get(`/api/published-papers/${id}`)
            return respone.data
        }
    })
}

export const updateSinglePaperMutation = (id:string | string[]) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (values: UpdateNewPaperSchemaType) => {
            const response = await axios.patch(`/api/published-papers/${id}`,values)
            return response.data
        },
        onSuccess: (data) => {
            toast.success("Paper successfully updated"),
            queryClient.invalidateQueries({
                queryKey: ['papers']
            }),
            router.push('/admin-resource')
        },
        onError: (error: Error | AxiosError) => {
            console.error(error)
            
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Failed to create update paper"
                toast.error(errorMessage)
            } else {
                toast.error("Failed to create update paper")
            }
        }
    })

    return mutation

}

export const useDeletePaperMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`/api/published-papers/${id}`)
            return response.data
        },
        onSuccess: (data) => {
            toast.success("Paper successfully updated"),
            queryClient.invalidateQueries({
                queryKey: ['papers']
            }),
            router.push('/admin-resource')
        },
        onError: (error: Error | AxiosError) => {
            console.error(error)
            
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Failed to create update paper"
                toast.error(errorMessage)
            } else {
                toast.error("Failed to create update paper")
            }
        }
    })

    return mutation
}

export const useCreateNewPaperMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    
    const mutation = useMutation({
        mutationFn: async (values: CreateNewPaperSchemaType) => {
            const response = await axios.post('/api/published-papers', values)
            return response.data
        },
        onSuccess: (data) => {
            toast.success("Paper successfully created"),
            queryClient.invalidateQueries({
                queryKey: ['papers']
            }),
            router.push('/admin-resource')
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