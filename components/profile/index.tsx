"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { ProfileHeader } from "./profile-header";
import { ProfileForm } from "./profile-form";
import { Loader } from "lucide-react";

interface UserType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  role: string;
  status: string;
  active: boolean;
  work_date: string;
  work_end: string | null;
  createdAt: string;
  updatedAt: string;
  last_active_date: string;
  token: string;
}
const ProfileComponent = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);

  if (!user) {
    return  <div className="h-[70vh] w-full flex items-center justify-center">
    <Loader className="animate-spin" />
  </div>;
  }
  return (
    <div className="container mx-auto py-10 px-5">
      <ProfileHeader user={user} />
      <div className="mt-8">
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default ProfileComponent;