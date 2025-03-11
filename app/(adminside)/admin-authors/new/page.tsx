"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { zodResolver } from "@hookform/resolvers/zod"
import { CreateNewAuthorSchema, type CreateNewAuthorSchemaType } from "@/lib/zod-schema"
import { AtSign, BookOpen, User, UserRound } from "lucide-react"
import { useCreateNewAuthorMutation } from "@/hooks/react-query-hook"

const CreateNewAuthor = () => {

  const createNewAuthorMutation = useCreateNewAuthorMutation()

  const form = useForm<CreateNewAuthorSchemaType>({
    resolver: zodResolver(CreateNewAuthorSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
    },
})

  const onSubmit = (values: CreateNewAuthorSchemaType) => {
    createNewAuthorMutation.mutateAsync(values)
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-authors">
                Authors
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
            <h1 className="text-3xl font-bold tracking-tight">New Author</h1>
            <p className="text-muted-foreground mt-2">Add a new author to your collection</p>
          </div>

          {/* Form Section */}
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Author Information</h2>
              <p className="text-muted-foreground text-sm mt-1">Enter the author's personal details below</p>
              <Separator className="mt-4" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter middle name (optional)"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormDescription>This is the author's public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <AtSign className="h-4 w-4 text-muted-foreground" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="author@example.com"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Footer with actions */}
                <div className="pt-6 mt-8 border-t flex justify-between items-center">
                  <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    className="px-8 font-medium"
                    disabled={createNewAuthorMutation.isPending}
                  >
                    {createNewAuthorMutation.isPending ? "Creating..." : "Create Author"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewAuthor

