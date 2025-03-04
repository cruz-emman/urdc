'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <SidebarProvider>
                <AppSidebar type="admin" />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </main>
    )
}


export default AdminLayout