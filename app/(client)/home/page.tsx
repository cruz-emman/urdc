import { Search, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-100 to-slate-200 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 w-10 h-10 flex items-center justify-center">
              <Image
                src="/trinity_logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">Trinity University Of Asia</h3>
              <p className="text-xs text-muted-foreground">11URDC</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-100 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">URDC</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            University Research and Development Center
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input type="text" placeholder="Search for title" className="pl-10 w-full" />
              </div>
              <Button type="submit">Search</Button>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                Advanced Search <ChevronDown className="h-3 w-3" />
              </Link>
            </div>

            {/* Advanced Search Options */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Year Start</label>
                <Input type="number" placeholder="From year" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year End</label>
                <Input type="number" placeholder="To year" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                    <SelectItem value="category3">Category 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Browse by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((categoryGroup) => (
              <Card key={categoryGroup}>
                <CardHeader>
                  <CardTitle>Category Titles {categoryGroup}</CardTitle>
                  <CardDescription>Browse items in this category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="border-b pb-2">
                        <Link href="#" className="hover:text-primary flex justify-between items-center">
                          <span>Item {item}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-100 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-gray-300 w-8 h-8 flex items-center justify-center">
                <Image
                  src="/trinity_logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="font-medium">Trinity Univeristy Of Asia</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center md:text-left text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

