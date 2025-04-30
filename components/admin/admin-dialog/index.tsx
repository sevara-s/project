"use client";

import { useState } from "react";
import { NewAdmin } from "@/@types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface AddAdminDialogProps {
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  newAdmin: NewAdmin;
  handleNewAdminChange: (field: keyof NewAdmin, value: string) => void;
  handleAddAdmin: () => Promise<void>;
  canPerformActions: boolean;
  isSubmitting?: boolean;
}

export default function AddAdminDialog({
  isAdding,
  setIsAdding,
  newAdmin,
  handleNewAdminChange,
  handleAddAdmin,
  canPerformActions,
  isSubmitting = false,
}: AddAdminDialogProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newAdmin.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    
    if (!newAdmin.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    
    if (!newAdmin.email.includes("@") || !newAdmin.email.includes(".")) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (newAdmin.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await handleAddAdmin();
    }
  };

  if (!canPerformActions) return null;

  return (
    <Dialog open={isAdding} onOpenChange={setIsAdding}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button variant="default" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Admin
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create New Administrator
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                First Name *
              </Label>
              <Input
                id="first_name"
                value={newAdmin.first_name}
                onChange={(e) => handleNewAdminChange("first_name", e.target.value)}
                className={`${errors.first_name ? "border-red-500" : ""}`}
              />
              {errors.first_name && (
                <p className="text-xs text-red-500">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                Last Name *
              </Label>
              <Input
                id="last_name"
                value={newAdmin.last_name}
                onChange={(e) => handleNewAdminChange("last_name", e.target.value)}
                className={`${errors.last_name ? "border-red-500" : ""}`}
              />
              {errors.last_name && (
                <p className="text-xs text-red-500">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={newAdmin.email}
                onChange={(e) => handleNewAdminChange("email", e.target.value)}
                className={`${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                value={newAdmin.password}
                onChange={(e) => handleNewAdminChange("password", e.target.value)}
                className={`${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role
              </Label>
              <Select
                value={newAdmin.role}
                onValueChange={(value) => handleNewAdminChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <Select
                value={newAdmin.status}
                onValueChange={(value) => handleNewAdminChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faol">Active</SelectItem>
                  <SelectItem value="nofaol">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Work Date */}
            <div className="space-y-2">
              <Label htmlFor="work_date" className="text-sm font-medium text-gray-700">
                Work Date
              </Label>
              <Input
                id="work_date"
                type="date"
                value={newAdmin.work_date}
                onChange={(e) => handleNewAdminChange("work_date", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
              disabled={isSubmitting}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Admin"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}