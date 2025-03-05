"use client";


import React from 'react'
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



const admindashboard = () => {
    // Move to other file
    const adminSearchFormSchema = z.object({
        title: z.string().min(2),
        year_start: z.number().min(1990).max(2026),
        year_end: z.number().min(1990).max(2026),
        subj_category: z.string()
    })


    // Move to the other file
    const form = useForm<z.infer<typeof adminSearchFormSchema>>({
        resolver: zodResolver(adminSearchFormSchema),
        defaultValues: {
        title: "",
        },
    })

    // Test onSubmit Function
    function onSubmit(values: z.infer<typeof adminSearchFormSchema>) {

        console.log(values)
    }

  return (
    <main>
        <div>admindashboard</div>

    </main>

  )
}



export default admindashboard