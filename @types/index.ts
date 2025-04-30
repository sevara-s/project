import React from "react";

export interface ChildrenType {
  children: React.ReactNode;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}
 export interface sidebarMenuType {
  id: number
  title: string
  path: string
  Icon?: any
}
export type Admin = {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: string
  createdAt: string | Date
  last_active_date: string | Date
  role?: string
  work_date?: string
  active?: boolean
  is_deleted?: boolean
}

export type NewAdmin = {
  first_name: string
  last_name: string
  email: string
  password: string
  role: string
  work_date: string
  status: string
}
export interface ManagersType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  createdAt?: string;
  last_active_date?: string;
}
 