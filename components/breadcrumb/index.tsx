"use client"

import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { sidebarMenuType } from "@/@types"
const breadcrumb_menu: sidebarMenuType[] = [
    {
        id: 1,
        title: "Asosiy",
        path: "/",
    },
    {
        id: 2,
        title: "Menejerlar",
        path: "/managers",
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admins",
    },
    {
        id: 4,
        title: "Ustozlar",
        path: "/teachers",
    },
    {
        id: 5,
        title: "O'quvchilar",
        path: "/students",
    },
    {
        id: 6,
        title: "Guruhlar",
        path: "/groups",
    },
    {
        id: 1,
        title: "Sozlamalar",
        path: "/settings",
    },
    {
        id: 2,
        title: "Profil",
        path: "/profile",
    },
]

const BreadcrumbComponent = () => {
  const pathname = usePathname()
  
  // Find the current breadcrumb item
  const currentItem = breadcrumb_menu.find(item => item.path === pathname)
  
  // Generate breadcrumb trail for nested paths
  const getBreadcrumbTrail = () => {
    const paths = pathname.split('/').filter(Boolean)
    const trail = []
    
    let accumulatedPath = ""
    for (const path of paths) {
      accumulatedPath += `/${path}`
      const menuItem = breadcrumb_menu.find(item => 
        item.path === accumulatedPath || 
        item.path === `/${path}` // Handle root-level matches
      )
      if (menuItem) {
        trail.push(menuItem)
      }
    }
    
    return trail
  }

  const breadcrumbTrail = getBreadcrumbTrail()


  return (
    <Breadcrumb className="px-4 py-2 bg-background/50 rounded-lg">
      <BreadcrumbList className="flex items-center gap-2">
        <BreadcrumbItem>
          <BreadcrumbLink 
            href="/" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbTrail.length > 0 && (
          <>
            <BreadcrumbSeparator className="[&>svg]:size-4">
              <ChevronRight className="text-muted-foreground" />
            </BreadcrumbSeparator>
            
            {breadcrumbTrail.map((item, index) => {
              const isLast = index === breadcrumbTrail.length - 1
              
              return (
                <React.Fragment key={item.id}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-sm font-medium">
                        {item.title}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.path}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  
                  {!isLast && (
                    <BreadcrumbSeparator className="[&>svg]:size-4">
                      <ChevronRight className="text-muted-foreground" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              )
            })}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbComponent