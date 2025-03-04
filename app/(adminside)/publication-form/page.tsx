"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Link, FileText, Tag, BookText, Info, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  publicationDate: z.date({
    required_error: "A publication date is required.",
  }),
  url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  categories: z.array(z.string()).min(1, {
    message: "Please select at least one category.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  subjectCategory: z.string({
    required_error: "Please select a subject category.",
  }),
})

const categories = [
  { label: "Research Paper", value: "research" },
  { label: "Case Study", value: "case-study" },
  { label: "Review", value: "review" },
  { label: "Article", value: "article" },
  { label: "Book Chapter", value: "book-chapter" },
  { label: "Conference Paper", value: "conference" },
  { label: "Thesis", value: "thesis" },
]

const subjectCategories = [
  { label: "JSTOR", value: "jstor" },
  { label: "Science", value: "science" },
  { label: "Technology", value: "technology" },
  { label: "Arts & Humanities", value: "arts" },
  { label: "Social Sciences", value: "social" },
  { label: "Business", value: "business" },
  { label: "Medicine", value: "medicine" },
]

export default function PublicationForm() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      categories: [],
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Create New Publication
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Fill in the details to add a new publication to your collection
          </CardDescription>
        </CardHeader>

        {isSuccess && (
          <div className="bg-green-100 dark:bg-green-900/20 p-4 flex items-center gap-2 text-green-800 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span>Publication created successfully!</span>
          </div>
        )}

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-1">
                        <BookText className="h-4 w-4" /> Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter publication title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publicationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" /> Publication Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subjectCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Tag className="h-4 w-4" /> Subject Category
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjectCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-1">
                        <Link className="h-4 w-4" /> URL (optional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/publication" {...field} />
                      </FormControl>
                      <FormDescription>Link to the publication if available online</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-1">
                        <Tag className="h-4 w-4" /> Categories
                      </FormLabel>
                      <div className="border rounded-md p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {field.value.map((category) => (
                            <Badge
                              key={category}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => {
                                const newCategories = field.value.filter((c) => c !== category)
                                form.setValue("categories", newCategories, { shouldValidate: true })
                              }}
                            >
                              {category}
                              <span className="ml-1">×</span>
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                Add category...
                                <Tag className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search categories..." />
                                <CommandList>
                                  <CommandEmpty>
                                    <div className="px-2 py-3 text-sm">
                                      No category found. Type and press Enter to create.
                                    </div>
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {categories
                                      .filter((category) => !field.value.includes(category.label))
                                      .map((category) => (
                                        <CommandItem
                                          key={category.value}
                                          value={category.label}
                                          onSelect={() => {
                                            const newCategories = [...field.value, category.label]
                                            form.setValue("categories", newCategories, { shouldValidate: true })
                                            setOpen(false)
                                          }}
                                        >
                                          {category.label}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                                <div className="border-t p-2">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault()
                                      const input = e.currentTarget.elements.namedItem(
                                        "customCategory",
                                      ) as HTMLInputElement
                                      const value = input.value.trim()

                                      if (value && !field.value.includes(value)) {
                                        const newCategories = [...field.value, value]
                                        form.setValue("categories", newCategories, { shouldValidate: true })
                                        input.value = ""
                                      }
                                      setOpen(false)
                                    }}
                                    className="flex gap-2"
                                  >
                                    <Input
                                      name="customCategory"
                                      placeholder="Type custom category..."
                                      className="h-8"
                                    />
                                    <Button type="submit" size="sm">
                                      Add
                                    </Button>
                                  </form>
                                </div>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      {form.formState.errors.categories && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.categories.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-1">
                        <Info className="h-4 w-4" /> Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief description of the publication"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        <span className={field.value.length > 500 ? "text-destructive" : ""}>
                          {field.value.length}/500 characters
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <CardFooter className="flex justify-end gap-3 px-0 pt-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? "Saving..." : "Create Publication"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

