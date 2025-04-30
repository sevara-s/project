"use client"

import { useEffect, useState } from "react"
import { request } from "@/request"
import Cookies from "js-cookie"
import { format, isValid } from "date-fns"  
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Users } from "lucide-react"

interface Manager {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: "faol" | "nofaol"
  createdAt: string
  last_active_date: string
}

const safeFormat = (dateString: string, formatString: string): string => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return isValid(date) ? format(date, formatString) : "-"
}

const Managers = () => {
  const [data, setData] = useState<Manager[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token")
      setIsLoading(true)
      setError(null)
      try {
        const res = await request.get("/api/staff/all-managers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setData(res.data.data || [])
      } catch (error) {
        console.error("Error fetching managers:", error)
        setError("Failed to load managers. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Managers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 text-destructive">
              <AlertCircle className="w-8 h-8 mb-4" />
              <p>{error}</p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
              <Users className="w-8 h-8 mb-4" />
              <p>No managers found</p>
            </div>
          ) : (
            <ScrollArea className="w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Ism</TableHead>
                    <TableHead>Familya</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Kiritilgan sana</TableHead>
                    <TableHead>Ohirgi aktivligi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((manager, index) => (
                    <TableRow key={manager._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {manager.first_name}
                      </TableCell>
                      <TableCell>{manager.last_name}</TableCell>
                      <TableCell>{manager.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            manager.status === "faol" ? "default" : "secondary"
                          }
                        >
                          {manager.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {safeFormat(manager.createdAt, "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        {safeFormat(manager.last_active_date, "yyyy-MM-dd HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Managers