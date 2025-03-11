'use client'
import React, { Suspense } from 'react';
import { PlusCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CreateNewPaperSchema, CreateNewPaperSchemaType } from '@/lib/zod-schema'
import { Separator } from "@/components/ui/separator"
import { AtSign, BookOpen, User, UserRound, Calendar } from "lucide-react"
import { categoryCollege, categoryGraduateSchool } from '@/lib/data';
import { useAuthorsQuery, useCreateNewPaperMutation } from '@/hooks/react-query-hook';
import SkeletonWrapper from '@/components/ui/skeleton-wrapper';
import LoadingFallback from '@/components/ui/loading';
import Link from 'next/link';


interface ListOfAuthors {
  id: string
  first_name: string
  middle_name: string
  last_name: string
  emai: string
}



const CreateNewPaper = () => {

  const listofAuthors = useAuthorsQuery()
  const createNewPaper = useCreateNewPaperMutation()


  const form = useForm<CreateNewPaperSchemaType>({
    resolver: zodResolver(CreateNewPaperSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: "",
      publication_source: "",
      publication_day: "",
      publication_month: "",
      publication_year: "",
      url: "",
    }
  })

  function onSubmit(values: CreateNewPaperSchemaType) {
     createNewPaper.mutate(values)
    console.log(values)
  }



  if (listofAuthors.isLoading) {
    return <LoadingFallback />
  }



  return (
    <div className='min-h-screen w-full bg-background flex flex-col'>
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-authors">
                Resources
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-authors/new">
                New
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-1 flex flex-col items-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1280px]">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">New Resources</h1>
            <p className="text-muted-foreground mt-2">Add a new resource to the collection</p>
          </div>

          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Resource Information</h2>
              <p className="text-muted-foreground text-sm mt-1">Enter the resource's personal details below</p>
              <Separator className="mt-4" />
            </div>
          </div>

          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/*Title Input Field*/}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter publication title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}

              <div className='flex flex-col gap-y-2'>
                <FormLabel className='flex items-center gap-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  Author
                </FormLabel>
                <div className='flex flex-row space-x-2'>
                  <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                      <FormItem className="w-full"> {/* Adjust the width here (e.g., w-64, w-80, w-96) */}
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full"> {/* Ensure trigger takes full width of parent */}
                              <SelectValue placeholder="Author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='w-full'>
                            {listofAuthors.data.map((author: ListOfAuthors) => (
                              <React.Fragment key={author.id}>
                                <SelectItem value={author.id}>{author.first_name} {author.last_name}</SelectItem>
                              </React.Fragment>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button asChild>
                    <Link href='/admin-authors/new'>
                      <PlusCircle className='h-6 w-6 text-white' />
                      Add Author
                    </Link>
                  </Button>
                </div>
              </div>



              {/* Publication Date */}

              <div className='flex flex-col gap-y-2'>

                <FormLabel className='flex items-center gap-2'>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Publication Date</FormLabel>
                <div className='grid grid-cols-3 gap-2'>

                  <FormField
                    control={form.control}
                    name="publication_day"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                              <SelectItem key={day} value={String(day)}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publication_month"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="1">January</SelectItem>
                            <SelectItem value="2">February</SelectItem>
                            <SelectItem value="3">March</SelectItem>
                            <SelectItem value="4">April</SelectItem>
                            <SelectItem value="5">May</SelectItem>
                            <SelectItem value="6">June</SelectItem>
                            <SelectItem value="7">July</SelectItem>
                            <SelectItem value="8">August</SelectItem>
                            <SelectItem value="9">September</SelectItem>
                            <SelectItem value="10">October</SelectItem>
                            <SelectItem value="11">November</SelectItem>
                            <SelectItem value="12">December</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publication_year"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 29 + i).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>





              {/* Categories */}
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category / Department </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category of the paper" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>College</SelectLabel>
                          {categoryCollege.map((category) => (
                            <React.Fragment key={category.value}>
                              <SelectItem value={category.value}>{category.label}</SelectItem>
                            </React.Fragment>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Graduate School</SelectLabel>
                          {categoryGraduateSchool.map((category) => (
                            <React.Fragment key={category.value}>
                              <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                            </React.Fragment>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />



              {/*Publication Source Field*/}
              <FormField
                control={form.control}
                name="publication_source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Publication Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="googleScholar">Google Scholar</SelectItem>
                        <SelectItem value="jstor">JSTOR</SelectItem>
                        <SelectItem value="idk">IDK</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* URL */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/publication" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/*Description Input Field*/}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit" className="w-full md:w-auto">
                Submit Publication
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}


export default CreateNewPaper