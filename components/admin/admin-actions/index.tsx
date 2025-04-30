"use client";

import { Admin } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, X, Save } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdminActionsProps {
  admin: Admin;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  handleSaveEdit: () => void;
  handleDelete: (id: string) => void;
  canPerformActions: boolean;
  isSaving?: boolean;
}

export default function AdminActions({
  admin,
  editingId,
  setEditingId,
  handleSaveEdit,
  handleDelete,
  canPerformActions,
  isSaving = false,
}: AdminActionsProps) {
  if (!canPerformActions) return null;

  return editingId === admin._id ? (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-2 justify-end"
    >
      <Button
        size="sm"
        variant="outline"
        onClick={() => setEditingId(null)}
        className="gap-1.5 hover:bg-gray-100 transition-colors"
      >
        <X className="h-4 w-4" />
        <span>Cancel</span>
      </Button>
      <Button
        size="sm"
        onClick={handleSaveEdit}
        disabled={isSaving}
        className={cn(
          "gap-1.5 transition-colors",
          isSaving ? "bg-emerald-700" : "bg-emerald-600 hover:bg-emerald-700"
        )}
      >
        {isSaving ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Save className="h-4 w-4" />
            </motion.div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>Save</span>
          </>
        )}
      </Button>
    </motion.div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
          aria-label="Admin actions"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="min-w-[180px] shadow-lg rounded-lg border border-gray-200 py-1"
      >
        <DropdownMenuItem
          onClick={() => setEditingId(admin._id)}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
        >
          <Edit className="h-4 w-4 text-blue-600" />
          <span>Edit Admin</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
          onClick={() => handleDelete(admin._id)}
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete Admin</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}