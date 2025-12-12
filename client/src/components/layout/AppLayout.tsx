import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Activity, LayoutDashboard, ScanLine, Settings, ShieldAlert, Cpu } from "lucide-react";
import { Link, useLocation } from "wouter";
import bgImage from "@assets/generated_images/futuristic_industrial_dashboard_background.png";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "Visual Inspection", icon: ScanLine, url: "/image-analysis" },
    { title: "Sensor Telemetry", icon: Activity, url: "/sensor-analysis" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <Sidebar className="border-r border-sidebar-border bg-sidebar">
          <SidebarHeader className="h-16 flex items-center px-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2 font-display font-bold text-xl text-primary tracking-wide">
              <Cpu className="h-6 w-6" />
              <span>NEXUS<span className="text-white">AI</span></span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mt-4">Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location === item.url}
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-primary data-[active=true]:border-r-2 data-[active=true]:border-primary transition-all duration-200"
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="h-4 w-4" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
               <div className="px-4 py-4">
                 <div className="rounded-lg bg-sidebar-accent p-4 border border-sidebar-border">
                   <div className="flex items-center gap-2 mb-2">
                     <ShieldAlert className="h-4 w-4 text-destructive" />
                     <span className="text-xs font-semibold text-foreground">System Status</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     <span className="text-xs text-muted-foreground">Operational</span>
                   </div>
                 </div>
               </div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        
        <main className="flex-1 overflow-hidden flex flex-col relative">
          <div className="absolute inset-0 z-0">
            <img src={bgImage} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>
          </div>

          <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10 sticky top-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-sm font-medium text-muted-foreground hidden md:block">
                Industrial Anomaly Detection Suite v2.0
              </h1>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-xs text-muted-foreground font-mono">
                 SERVER: <span className="text-emerald-500">CONNECTED</span>
               </div>
               <div className="h-8 w-8 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center">
                 <span className="text-xs font-bold">JD</span>
               </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
             {/* Ambient Background Glow */}
             <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
             {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
