import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { safeFormatDate } from "@/app/utils";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEditProfileImgMutation } from "@/request/mutation";

interface ProfileHeaderType {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    role: string;
    status: string;
    active: boolean;
    work_date: string;
  };
}

export function ProfileHeader({ user }: ProfileHeaderType) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    user.image ||
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
  );
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false); // yangi holat

  const { mutate } = useEditProfileImgMutation();

  useEffect(() => {
    const savedProfile = Cookies.get("user");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setImagePreview(profileData.image);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const profileData = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      };

      try {
        await mutate({
          profileData,
          image: selectedImage,
        });

        // Rasm yuklangandan so'ng "Saqlash" tugmasini yashirish
        setIsImageUploaded(true);  // tugma yashirish
        // Cookiesda saqlash
        const updatedProfile = {
          ...profileData,
          image: URL.createObjectURL(selectedImage),
        };
        Cookies.set("user", JSON.stringify(updatedProfile), { expires: 7 });
      } catch (error) {
        console.error("Rasm yuborishda xatolik:", error);
      }
    }
  };

  return (
    <Card className="text-black dark:text-white">
      <CardContent className="relative pt-6">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col items-center sm:flex-row gap-4">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <img
                src={imagePreview}
                alt={`${user.first_name} ${user.last_name}`}
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-semibold text-black dark:text-white">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <Badge
              variant={
                user.role === "admin"
                  ? "destructive"
                  : user.role === "manager"
                  ? "default"
                  : "secondary"
              }
            >
              {user.role}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-black dark:text-white">
              Qo&apos;shilgan: {formatDate(user.work_date)}
            </span>
          </div>

          <div className="flex gap-2 justify-end items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-input"
              onChange={handleImageChange}
            />

            <label htmlFor="image-input">
              <p className="cursor-pointer px-4 py-2 border-2 rounded-xl">
                Rasmni ozgartirish
              </p>
            </label>

            {!isImageUploaded && selectedImage && (
              <Button onClick={handleImageUpload} className="ml-2 cursor-pointer">
                Saqlash
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}