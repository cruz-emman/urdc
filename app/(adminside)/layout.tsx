import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full">
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    <div className=" w-full mx-auto ">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </main>
    )
}

export default AdminLayout