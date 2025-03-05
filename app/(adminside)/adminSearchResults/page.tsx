import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Table,  TableBody,  TableCaption,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table"

const adminSearchResults = () => {
  return (
    <div className='w-full m-24'>


      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    
    
    
    </div>
  )
}

export default adminSearchResults