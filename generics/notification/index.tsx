import { toast } from "sonner";

type NotificationApiType =
  | "login"
  | "error_login"
  | "logout"
  | "edit-admin"
  | "adminaction"
  | "delete-admin"
  | "add-admin"
  | "edit-profile";
export const notificationApi = () => {
  const notify = (type: NotificationApiType) => {
    switch (type) {
      case "login":
        return toast.success("Tizimga kirdingiz !");
      case "error_login":
        return toast.success(
          "email yoki  noto'gri"
        );
      case "logout":
        return toast.success("Tizimdan chiqdingiz !");
      case "edit-admin":
        return toast.success("Admin tahrirlandi !");
      case "adminaction":
        return toast.success("Admin o'zgartira olmaydi !");
      case "delete-admin":
        return toast.success("Admin o'chirildi !");
      case "add-admin":
        return toast.success("Yangi admin qo'shildi");
      case "edit-profile":
        return toast.success("Tahrirlandi");
      default:
        break;
    }
  };
  return notify;
};