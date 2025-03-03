'use client';

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { PlusCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { Popover,  PopoverContent,  PopoverTrigger,} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";


import { AddResourceSchema, AddResourceSchemaType } from '@/lib/zod-schema'



// Mock data for categories 
const mockCategories = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Science" },
  { id: "3", name: "Nursing" },
]




const adminSubmitResource = () => {

  const form = useForm<AddResourceSchemaType>({
    resolver: zodResolver(AddResourceSchema),
    defaultValues: {
      title: "",
      url: "",
      publication_source: "",
      categories: [],
      contributors: [],
      description: "",
    },
  })


  async function onSubmit(values: AddResourceSchemaType){
      console.log(values)
  }

  // States for categories and contributors
  const [selectedCategories, setSelectedCategories] = useState<typeof mockCategories>([])
  //const [selectedContributors, setSelectedContributors] = useState<typeof mockContributors>([])
  //const [contributorSearchTerm, setContributorSearchTerm] = useState("")
  //const [newContributorDialogOpen, setNewContributorDialogOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)


  // Toggle category selection
  const toggleCategory = (categoryId: string, categoryName: string) => {
    const category = { id: categoryId, name: categoryName }

    if (selectedCategories.some((c) => c.id === categoryId)) {
      const updated = selectedCategories.filter((c) => c.id !== categoryId)
      setSelectedCategories(updated)
      form.setValue(
        "categories",
        updated.map((c) => c.id),
      )
    } else {
      const updated = [...selectedCategories, category]
      setSelectedCategories(updated)
      form.setValue(
        "categories",
        updated.map((c) => c.id),
      )
    }
  }

  // Remove a category
  const removeCategory = (categoryId: string) => {
    const updated = selectedCategories.filter((c) => c.id !== categoryId)
    setSelectedCategories(updated)
    form.setValue(
      "categories",
      updated.map((c) => c.id),
    )
  }

  // Main Page
  return (
    <main className='h-full w-[70vw] flex flex-col items-center m-10 sm:m-5'>   
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl w-full flex-wrap">
          
          {/*Title Input Field*/}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input placeholder="Enter publication title" {...field} />
                </FormControl>
                </FormItem>
            )}
          />

          {/* Publication Date */}
          <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Publication Date</FormLabel>
                <div className="grid grid-cols-3 gap-2">

                  {/* Day Select */}
                  <Select
                    value={field.value ? String(field.value.getDate()) : ""}
                    onValueChange={(value) => {
                      const currentDate = field.value || new Date()
                      const newDate = new Date(currentDate)
                      newDate.setDate(Number.parseInt(value))
                      field.onChange(newDate)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>

                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={String(day)}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>

                  {/* Month Select */}
                  <Select
                    value={field.value ? String(field.value.getMonth()) : ""}
                    onValueChange={(value) => {
                      const currentDate = field.value || new Date()
                      const newDate = new Date(currentDate)
                      newDate.setMonth(Number.parseInt(value))
                      field.onChange(newDate)
                    }}
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>

                    <SelectContent>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month, index) => (
                        <SelectItem key={month} value={String(index)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>

                  {/* Year Select */}
                  <Select
                    value={field.value ? String(field.value.getFullYear()) : ""}
                    onValueChange={(value) => {
                      const currentDate = field.value || new Date()
                      const newDate = new Date(currentDate)
                      newDate.setFullYear(Number.parseInt(value))
                      field.onChange(newDate)
                    }}
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>

                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 29 + i).map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>
                </div>
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

          {/* Categories */}
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <FormLabel>Categories</FormLabel>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedCategories.map((category) => (
                      <Badge key={category.id} variant="secondary" className="px-3 py-1">
                        {category.name}
                        <button
                          type="button"
                          onClick={() => removeCategory(category.id)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Popover open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoriesOpen}
                        className="w-full justify-between text-gray-400"
                      >
                        Select categories
                        <PlusCircle className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>


                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandList>

                          <CommandEmpty>No category found.</CommandEmpty>

                          <CommandGroup>
                            {mockCategories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => toggleCategory(category.id, category.name)}
                              >
                                <div className="flex items-center">
                                  <span
                                    className={cn(
                                      "mr-2 h-4 w-4 rounded-sm border border-primary",
                                      selectedCategories.some((c) => c.id === category.id)
                                        ? "bg-primary"
                                        : "bg-transparent",
                                    )}
                                  ></span>
                                  {category.name}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                </FormItem>
            )}
          />

          {/*Publication Source Field*/}
          <FormField
              control={form.control}
              name="publication_source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Publication Source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Iseparate ata ito tapos gawin map idk */}
                      <SelectItem value="googleScholar">Google Scholar</SelectItem>
                      <SelectItem value="jstor">JSTOR</SelectItem>
                      <SelectItem value="idk">IDK</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
              />



        </form>
      </Form>
    </main>
  )
}

export default adminSubmitResource