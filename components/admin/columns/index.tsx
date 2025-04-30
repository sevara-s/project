import {ColumnDef} from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Columns} from "@/request/mutation"

export type RowData = Columns & {
    onEdit?: (row: Columns) => void
    onDelete?: (row: Columns) => void
}
export const columns: ColumnDef<Columns>[] = [
    {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        id: "fullName",
        header: "F.I.SH",
    },

    {
        accessorKey: "status",
        header: "Holat",
    },
    {
        accessorKey: "email",
        header: "Email",
    },

    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            const rowData = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                (rowData as RowData).onEdit?.(rowData)
                            }>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                (rowData as RowData).onDelete?.(rowData)
                            }>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]