"use client"

import { Bell, MessageCircleMore } from "lucide-react"
import BreadcrumbComponent from "../breadcrumb"
import { ThemeToggle } from "../theme-change"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()
  const isDashboard = pathname === "/"

  return (
    <header className={cn(
      "sticky top-0 z-40 flex justify-between items-center w-full",
      "py-3 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "transition-all duration-200 ease-in-out"
    )}>
      <nav className="flex-1 min-w-0">
        <BreadcrumbComponent />
      </nav>

      <nav className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full h-8 w-8"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full h-8 w-8"
            aria-label="Messages"
          >
            <MessageCircleMore className="h-4 w-4" />
            <span className="absolute top-0 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
          </Button>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle className={cn(
          "h-8 w-8",
          isDashboard ? "hidden md:flex" : "flex"
        )} />
      </nav>
    </header>
  )
}

export default Header