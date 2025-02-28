"use client";

import Image from 'next/image';
import Link from "next/link";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {

  // Move to other file
  const formSchema = z.object({
    title: z.string().min(2),
    year_start: z.number().min(1990).max(2026),
    year_end: z.number().min(1990).max(2026),
    subj_category: z.string()
  })


    // Move to the other file
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
      },
    })
   
    // Test onSubmit Function
    function onSubmit(values: z.infer<typeof formSchema>) {

      console.log(values)
    }

  return (
    <body className="flex flex-col justify-center bg-white">

      {/* Top Part */}
      <div className="flex flex-col p-5 sm:p-7 h-[50vp] bg-gray-200">
        <Image
         src="/logo.png"
         alt="logo eme"
         width="100"
         height="50"
         />

        <div className='flex flex-col items-start sm:items-center'>
          <p className="font-bold text-[40px] mt-10 sm:text-[60px] overflow-hidden text-ellipsis">
            LOREM IPSUM EMEMEMEME
          </p>
          <p className="font-thin text-[20px]">Title subtitle</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col p-10 h-auto bg-white items-center gap-3 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[800px]">
            <Link href="/..." className="flex justify-end underline text-blue-600">Advance Search</Link>

            <div className="flex gap-6 flex-row w-full">
              <div className="flex-3 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Search for Tite" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 w-full">
                <Button type="submit">Submit</Button>
              </div> 
            </div>

            
            <div className="flex gap-6 flex-row w-full mt-1 flex-wrap">
            <FormField
              control={form.control}
              name="year_start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Start</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder=""
                    type='number'
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year End</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder=""
                    type='number'
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subj_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category to search" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="eng">English</SelectItem>
                      <SelectItem value="fil">Filipino</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>

          </form>
        </Form>
      </div>
      
      {/* Browse by Category (idk kung gagawin dynamic ito based sa categories na nakalagay sa db) */}

      <div className="flex flex-col w-full justify-center items-center p-5 ml-15 mr-15">
        <p className="font-bold text-2xl ">Browse by Category</p>

        
        <div className="flex flex-row flex-wrap max-w-[500px] justify-between">
          
          <div className="flex flex-col flex-1 ">
                <div className='font-bold text-lg'>
                  Cateogry Titles
                </div>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
          </div>

          <div className="flex flex-col flex-1">
                <div className='font-bold text-lg'>
                  Cateogry Titles
                </div>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
          </div>

          <div className="flex flex-col flex-1">
                <div className='font-bold text-lg'>
                  Cateogry Titles
                </div>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
          </div>
        </div>
      </div>
    </body>
  );
}
