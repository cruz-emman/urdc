'use client'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import React from 'react'
import { CreateNewPaperSchema, CreateNewPaperSchemaType } from '@/lib/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'

const CreateNewAuthor = () => {

  const form = useForm<CreateNewPaperSchemaType>({
    resolver: zodResolver(CreateNewPaperSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      publication_source: "",
      publication_date: "",
      url: "",
      authorId: "",
    }
  })


  const onSubmit = () => {

  }

  return (
    <div className='relative p-4'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold text-foreground'>New Author</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className='flex flex-col gap-y-2'>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateNewAuthor