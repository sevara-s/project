"use client"
import Cookies from "js-cookie"
import {useQuery} from "@tanstack/react-query"
import {useState} from "react"

import {CirclePlus, Loader} from "lucide-react"

import {Button} from "@/components/ui/button"
import AdminActions from "./admin-actions"
import {request} from "@/request"
import { AdminTable } from "./admin-table"
import {columns as baseColumns} from "./columns/index"
import {notificationApi} from "@/generics/notification"
import { EditModal } from "./admin-edit"
import {Columns, deleteAdmin} from "@/request/mutation"
import { AddModal } from "./add"


export default function AdminPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Columns | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const user = JSON.parse(Cookies.get("user") || "{}")
    const notify = notificationApi()

    const handleEdit = (row: Columns) => {
        if (user.role === "admin") {
            return notify("adminaction")
        }
        setSelectedRow(row)
        setShowEditModal(true)
    }

    const handleDelete = (row: Columns) => {
        if (user.role === "admin") {
            return notify("adminaction")
        }
        deleteAdmin(row._id, refetch)
    }

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["admindata"],
        queryFn: async () => {
            const response = await request.get("/api/staff/all-admins", {})
            return response.data.data
        },
    })

    const newData = data?.map((item: Columns) => ({
        ...item,
        onEdit: handleEdit,
        onDelete: handleDelete,
    }))

    if (isLoading)
        return (
            <div className="h-[70vh] w-full flex items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        )

    if (isError) return <div>Error loading data</div>

    return (
        <div className="container mx-auto px-5">
            <div className="flex items-center justify-between pb-5">
                <h1 className="font-medium text-xl">Adminlar royxati</h1>
                {user.role === "manager" && (
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="mb-4 cursor-pointer">
                        <CirclePlus className="mr-2" /> Add Admin
                    </Button>
                )}
            </div>

            <AdminTable columns={baseColumns} data={newData} />

            {/* ADD MODAL */}

            <AddModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                refetch={refetch}
            />

            {/* EDIT MODAL */}
            {showEditModal && selectedRow && (
                <EditModal
                    data={selectedRow}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    )
}