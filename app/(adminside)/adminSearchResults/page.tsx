import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const adminSearchResults = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>adminsearchresults</div>
  )
}

export default adminSearchResults