"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Columns,

  useEditAdminMutation,
} from "@/request/mutation";

interface EditModalProps {
  data: Columns;
  onClose: () => void;
}
export interface EditData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}
export function EditModal({ data, onClose }: EditModalProps) {
  const { mutate } = useEditAdminMutation();
  const [formData, setFormData] = useState<EditData>({
    _id: data._id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    status: data.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Updating Data");

    mutate(formData);

    console.log("Updated Data:", formData);
    onClose(); // optionally close the modal after submitting
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}