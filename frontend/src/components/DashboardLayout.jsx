import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  Users, 
  BarChart, 
  PlusCircle, 
  ListVideo
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children, type = "user" }) => { // type: "user" | "admin"
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const userLinks = [
    { name: "My Courses", href: "/dashboard", icon: LayoutDashboard },
    { name: "Browse Courses", href: "/courses", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Create Course", href: "/create-course", icon: PlusCircle },
    { name: "Manage Courses", href: "/admin/courses", icon: ListVideo },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  ];

  const links = type === "admin" ? adminLinks : userLinks;

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>CourseBanao</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                location.pathname === link.href && "bg-muted text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SidebarContent />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
