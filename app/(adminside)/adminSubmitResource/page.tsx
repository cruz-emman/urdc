'use client';

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


import { AddResourceSchema, AddResourceSchemaType } from '@/lib/zod-schema'



// Mock data for categories (iseparate ata ito )
const mockCategories = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Science" },
  { id: "3", name: "Nursing" },
]

// Mock Data for Contributors
const mockContributors = [
  { id: "1", firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { id: "2", firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
  { id: "3", firstName: "Robert", lastName: "Johnson", email: "robert.johnson@example.com" },
]



const adminSubmitResource = () => {
  // States for categories and contributors
  const [selectedCategories, setSelectedCategories] = useState<typeof mockCategories>([])
  const [selectedContributors, setSelectedContributors] = useState<typeof mockContributors>([])
  const [contributorSearchTerm, setContributorSearchTerm] = useState("")
  const [newContributorDialogOpen, setNewContributorDialogOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  // Form
  const form = useForm<AddResourceSchemaType>({
    resolver: zodResolver(AddResourceSchema),
    defaultValues: {
      title: "",
      url: "",
      publicationDate: undefined,
      publication_source: "",
      categories: [],
      contributors: [{ firstName: "", lastName: "", email: "" }],
      description: "",
    },
  })


  function onSubmit(values: AddResourceSchemaType){
    console.log(values);
  }



  // Filter contributors based on search term
  const filteredContributors = mockContributors.filter(
    (contributor) =>
      !selectedContributors.some((selected) => selected.id === contributor.id) &&
      (contributor.firstName.toLowerCase().includes(contributorSearchTerm.toLowerCase()) ||
        contributor.lastName.toLowerCase().includes(contributorSearchTerm.toLowerCase()) ||
        contributor.email.toLowerCase().includes(contributorSearchTerm.toLowerCase())),
  )

  // Add a new contributor
  const addNewContributor = (firstName: string, lastName: string, email: string) => {
    const newContributor = {
      id: `new-${Date.now()}`,
      firstName,
      lastName,
      email,
    }

    setSelectedContributors([...selectedContributors, newContributor])
    form.setValue("contributors", [...selectedContributors, newContributor])
    setNewContributorDialogOpen(false)
  }

  // Add an existing contributor
  const addExistingContributor = (contributor: (typeof mockContributors)[0]) => {
    setSelectedContributors([...selectedContributors, contributor])
    form.setValue("contributors", [...selectedContributors, contributor])
    setContributorSearchTerm("")
  }

  // Remove a contributor
  const removeContributor = (contributorId: string) => {
    const updatedContributors = selectedContributors.filter((contributor) => contributor.id !== contributorId)
    setSelectedContributors(updatedContributors)
    form.setValue("contributors", updatedContributors)
  }

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
    <main className='h-full w-full flex flex-col items-center justify-center px-4 sm:px-2'>   
      
      <p className='text-4xl items-start flex justify-start w-full font-bold mb-4'>Submit Resource</p>
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl mx-auto space-y-8">
          
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
                    onValueChange={(value) => {
                      const selectedDate = new Date();
                      selectedDate.setDate(Number(value));
                      form.setValue('publicationDate', selectedDate, { 
                        shouldValidate: true 
                      });
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
                    onValueChange={(value) => {
                      const selectedDate = new Date();
                      selectedDate.setMonth(Number(value) - 1);
                      form.setValue('publicationDate', selectedDate, { 
                        shouldValidate: true 
                      });
                    }}  
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>

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

                  {/* Year Select */}
                  <Select
                    onValueChange={(value) => {
                      const selectedDate = new Date();
                      selectedDate.setFullYear(Number(value));
                      form.setValue('publicationDate', selectedDate, { 
                        shouldValidate: true 
                      });
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

          {/* Contributors */}
        <FormField
          control={form.control}
          name="contributors"
          render={() => (
            <FormItem>
              <FormLabel>Contributors</FormLabel>
              <div className="space-y-4">
                {/* Selected Contributors */}
                <div className="space-y-2">
                  {selectedContributors.map((contributor) => (
                    <div key={contributor.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">
                          {contributor.firstName} {contributor.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{contributor.email}</p>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeContributor(contributor.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Search Existing Contributors */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search contributors..."
                        className="pl-8"
                        value={contributorSearchTerm}
                        onChange={(e) => setContributorSearchTerm(e.target.value)}
                      />
                    </div>
                    <Dialog open={newContributorDialogOpen} onOpenChange={setNewContributorDialogOpen}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          New
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Contributor</DialogTitle>
                        </DialogHeader>
                        <NewContributorForm onAdd={addNewContributor} />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Search Results */}
                  {contributorSearchTerm && (
                    <div className="border rounded-md overflow-hidden">
                      {filteredContributors.length > 0 ? (
                        filteredContributors.map((contributor) => (
                          <div
                            key={contributor.id}
                            className="p-2 hover:bg-accent cursor-pointer flex items-center justify-between"
                            onClick={() => addExistingContributor(contributor)}
                          >
                            <div>
                              <p className="font-medium">
                                {contributor.firstName} {contributor.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">{contributor.email}</p>
                            </div>
                            <Button type="button" variant="ghost" size="sm">
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-center text-muted-foreground">No contributors found</div>
                      )}
                    </div>
                  )}
                </div>
                <FormMessage />
              </div>
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


          <Button type="submit" className="w-full md:w-auto">
            Submit Publication
          </Button>



        </form>
      </Form>
      
    </main>
  )
}


// New Contributor Form Component
function NewContributorForm({
  onAdd,
}: {
  onAdd: (firstName: string, lastName: string, email: string) => void
}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (firstName && lastName && email) {
      onAdd(firstName, lastName, email)
      setFirstName("")
      setLastName("")
      setEmail("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Add Contributor</Button>
      </div>
    </form>
  )
}


export default adminSubmitResource