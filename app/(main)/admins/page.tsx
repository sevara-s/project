import AdminPage from "@/components/admin"
import {request} from "@/request"
import {QueryClient, dehydrate, HydrationBoundary} from "@tanstack/react-query"
import React from "react"

const getManagers = async () => {
    const res = await request.get("/api/staff/all-admins")
    return res.data.data
}

const Admins = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["admins"],
        queryFn: getManagers,
    })

    const dehydratedState = dehydrate(queryClient)

    return (
        <div className="container mx-auto py-10">
            <HydrationBoundary state={dehydratedState}>
                <AdminPage />
            </HydrationBoundary>
        </div>
    )
}
export default Admins