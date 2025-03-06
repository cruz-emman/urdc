import { Upload, Home, Search, Settings, LogOut, Book, icons } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "admin-dashboard",
    icon: Home,
  },
  {
    title: "Upload Resource",
    url: "/admin-resource/new",
    icon: Upload,
  },
  {
    title: "View Resources",
    url: "/admin-resource",
    icon: Search,
  },
  {
    title: "View Authors",
    url: "/admin-authors",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const clientLinks = [
  {
    title: "Home",
    url: "/Home",
    icon: Home
  },
  {
    title: "About",
    url: "/About",
    icon: Book,
  },
  {
    title: "Advance Search",
    url: `/advanceSearch`,
    icon: Search,
  }
]

export function AppSidebar({ type }: { type: string }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Get Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {type === 'client' ? (
                <>
                 {clientLinks.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              ) : (
                <>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <LogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
