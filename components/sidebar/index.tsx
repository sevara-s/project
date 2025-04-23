"use client"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { sidebarMenuType } from "@/@types"
import {
    Boxes,
    ContactRound,
    HomeIcon,
    Settings,
    ShieldUser,
    UserCircle,
    UserRoundPen,
    Users,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export const sidebar_menu: sidebarMenuType[] = [
    {
        id: 1,
        title: "Asosiy",
        path: "/",
        Icon: HomeIcon,
    },
    {
        id: 2,
        title: "Menejerlar",
        path: "/managers",
        Icon: ShieldUser,
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admins",
        Icon: ContactRound,
    },
    {
        id: 4,
        title: "Ustozlar",
        path: "/teachers",
        Icon: UserRoundPen,
    },
    {
        id: 5,
        title: "O'quvchilar",
        path: "/students",
        Icon: Users,
    },
    {
        id: 6,
        title: "Guruhlar",
        path: "/groups",
        Icon: Boxes,
    },
]

export const other_menu: sidebarMenuType[] = [
    {
        id: 1,
        title: "Sozlamalar",
        path: "/settings",
        Icon: Settings,
    },
    {
        id: 2,
        title: "Profil",
        path: "/profile",
        Icon: UserCircle,
    },
]

const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { theme } = useTheme()

    const handleLogout = () => {
        Cookies.remove("user")
        Cookies.remove("token")
        toast.success("Tizimdan chiqdingiz")
        router.push("/login")
    }

    return (
        <div className={cn(
            "w-[280px] h-screen p-4 border-r flex flex-col gap-[10px]",
            "bg-background text-foreground",
            "transition-all duration-300 ease-in-out"
        )}>
            <div className="px-2 py-4">
                <h2 className="font-bold text-lg">ADMIN CRM</h2>
            </div>

            <div className="flex flex-col gap-[10px]">
                <h2 className="text-sm font-medium px-2">Menu</h2>
                {sidebar_menu.map(({ Icon, title, id, path }) => (
                    <Button
                        onClick={() => router.push(path)}
                        key={id}
                        className={cn(
                            "flex items-center gap-4 w-full justify-start",
                            "transition-all duration-200",
                            "hover:bg-primary/10 hover:text-primary",
                            "dark:hover:bg-primary/20 dark:hover:text-primary",
                            pathname === path &&
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                        )}
                        variant="ghost"
                    >
                        <Icon className="h-4 w-4" />
                        <h2>{title}</h2>
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-[10px]">
                <h2 className="text-sm font-medium px-2">Boshqalar</h2>
                {other_menu.map(({ Icon, title, id, path }) => (
                    <Button
                        onClick={() => router.push(path)}
                        key={id}
                        className={cn(
                            "flex items-center gap-4 w-full justify-start",
                            "transition-all duration-200",
                            "hover:bg-secondary hover:text-secondary-foreground",
                            "dark:hover:bg-secondary/80",
                            pathname === path &&
                            "bg-secondary text-secondary-foreground"
                        )}
                        variant="ghost"
                    >
                        <Icon className="h-4 w-4" />
                        <h2>{title}</h2>
                    </Button>
                ))}
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className={cn(
                        "flex items-center gap-4 w-full justify-start",
                        "text-destructive hover:bg-destructive/10 hover:text-destructive",
                        "dark:text-red-400 dark:hover:bg-red-400/10 dark:hover:text-red-400",
                        "transition-all duration-200"
                    )}
                >
                    <LogOut className="h-4 w-4" />
                    <h2>Chiqish</h2>
                </Button>
            </div>
        </div>
    )
}

export default Sidebar