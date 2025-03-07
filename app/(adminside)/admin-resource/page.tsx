'use client'
import React from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowUpDown, BookOpen, ChevronDown, Download, MoreHorizontal, Plus, Search } from "lucide-react"


const data: Payment[] = [
  {
    title: "m5gr84i9",
    categories: [
      "Science",
      "Technology"
    ],
    publication_source: "JSTOR",
    publication_date: new Date("2022-02-01T00:00:00.000Z"),
    url: "https://example.com/article/m5gr84i9",
    authorId: "auth123",
  },
  {
    title: "dfawefwagea",
    categories: [
      "Technology"
    ],
    publication_source: "JSTOR",
    publication_date: new Date("2022-02-01T00:00:00.000Z"),
    url: "https://example.com/article/dfawefwagea",
    authorId: "auth123",
  },
];


export type Payment = {
  title: string
  categories: Array<string> 
  publication_source: string
  publication_date: Date
  url: string
  authorId: string
}


export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  
  {
    accessorKey: "authorId",
    header: "Author",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("authorId")}</div>
    ),
  },
  {
    accessorKey: "categories",
    header: "Cateogries",
    cell: ({ row }) => {
      const categories = row.getValue("categories") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="px-3 py-1 capitalize">
              {category}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "publication_source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="secondary" className="px-3 py-1 capitalize">
        {row.getValue("publication_source")}
      </Badge>
    ),
  },
  {
    accessorKey: "publication_date",
    header: "Date Published",
    cell: ({ row }) => {
      // Get the Date object from the row
      const date = row.getValue("publication_date");
      
      // Format the date as a readable string
      const formattedDate = date instanceof Date 
        ? date.toLocaleDateString() // e.g., "3/6/2025"
        : String(date); // Fallback in case it's not a Date object
      
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("url") as string;
      return (
        <a 
          href={url} 
          className="text-blue-600 hover:underline" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {url}
        </a>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>

          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>Edit Resource</DropdownMenuItem>
            <DropdownMenuItem>Archive Resource</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



const ListOfPapers = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className='min-h-screen w-full bg-background flex flex-col'>
      <div className='container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6'>

        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin-resource">
                Resources
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-primary" />
                <div>
                  <CardTitle className="text-lg md:text-2xl font-bold">List of Resources</CardTitle>
                  <CardDescription>Manage the resources</CardDescription>
                </div>
              </div>
              <Button asChild className="sm:w-auto">
                <Link href="/admin-resource/new" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Create new resource</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter resources..."
                  value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="ml-auto">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Columns <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>


            <div className="rounded-md border w-full">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                selected.
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default ListOfPapers