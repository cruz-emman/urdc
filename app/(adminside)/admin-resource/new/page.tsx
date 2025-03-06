'use client'
import React from 'react';
import { PlusCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { Popover,  PopoverContent,  PopoverTrigger,} from "@/components/ui/popover";
import {  Dialog,  DialogContent,  DialogDescription,  DialogHeader,  DialogTitle,  DialogTrigger} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CreateNewPaperSchema, CreateNewPaperSchemaType } from '@/lib/zod-schema'



// Mock data for categories (iseparate ata ito )
const mockCategories = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Science" },
  { id: "3", name: "Nursing" },
]




const CreateNewPaper = () => {

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

export default CreateNewPaper