import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationApi } from "@/generics/notification";
import { request } from "..";
import { CreateAdminData } from "@/components/admin/admin-actions";
import { EditProfileData } from "@/components/profile/profile-form";

export type Columns = {
  _id: string;
  fullName: string;
  first_name: string;
  last_name: string;
  role: string;
  status: "active" | "inactive" | "none";
  email: string;
  address: string;
  actions: "delete" | "edit";
};
export interface EditData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

export const useLoginMutation = () => {
  const router = useRouter();
  const notify = notificationApi();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: object) =>
      request.post("/api/auth/sign-in", data).then((res) => res.data.data),
    onSuccess: async (data) => {
      const token = data.token;
      Cookies.set("token", token, { expires: 1 / 24 });
      Cookies.set("user", JSON.stringify(data), { expires: 1 / 24 });
      router.push("/");
      notify("login");
    },
    onError: (error: { status: number }) => {
      console.log(error);
      if (error.status == 400) {
        notify("error_login");
      }
    },
  });
};

export const useEditMutationCache = () => {
  const queryclient = useQueryClient();
  return (data: EditData) => {
    return queryclient.setQueryData(
      ["admindata"],
      (old: Columns[] | undefined) => {
        return old?.map((item: Columns) =>
          item._id === data._id ? { ...item, ...data } : item
        );
      }
    );
  };
};
export const useEditAdminMutation = () => {
  const mutationcache = useEditMutationCache();
  const notify = notificationApi();

  return useMutation({
    mutationKey: ["edit-admin"],
    mutationFn: async (data: EditData) => {
      mutationcache(data);
      return await request
        .post("api/staff/edited-admin", data)
        .then((res) => res.data.data);
    },
    onSuccess: (data) => {
      console.log(" Edit success:", data);
      notify("edit-admin");
    },
    onError: (error: { status: number }) => {
      console.log(error);
    },
  });
};

export const useDeleteMutationCache = () => {
  const queryclient = useQueryClient();
  return (data: { _id: string }) => {
    return queryclient.setQueryData(
      ["admindata"],
      (old: Columns[] | undefined) => {
        return old?.filter((item: Columns) => item._id !== data._id);
      }
    );
  };
};

export const deleteAdmin = async (_id: string, refetch: () => void) => {
  const notify = notificationApi();
  try {
    const response = await request.delete("/api/staff/deleted-admin", {
      data: { _id },
    });
    console.log("O‘chirish muvaffaqiyatli:", response.data.message);
    notify("delete-admin");
    refetch();
  } catch (error) {
    console.error("O‘chirishda xatolik:", error);
  }
};

export const useAddAdminMutation = () => {
  const notify = notificationApi();

  return useMutation({
    mutationKey: ["add-admin"],
    mutationFn: async (data: CreateAdminData) => {
      return await request
        .post("api/staff/create-admin", data)
        .then((res) => res.data.data);
    },
    onSuccess: () => {
      notify("add-admin");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useEditProfileMutationCache = () => {
  const queryclient = useQueryClient();
  return (data: EditProfileData) => {
    return queryclient.setQueryData(
      ["profiledata"],
      (old: EditProfileData | undefined) => {
        return { ...old, ...data };
      }
    );
  };
};

export const useEditProfileMutation = () => {
  const mutationcache = useEditProfileMutationCache();
  const notify = notificationApi();

  return useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: (data: EditProfileData) => {
      mutationcache(data);
      return request.post("api/auth/edit-profile", data).then((res) => {
        console.log(res);
        return res.data.data;
      });
    },
    onSuccess: (data) => {
      console.log(data);

      notify("edit-profile");
    },
    onError: (error: { status: number }) => {
      console.log(error);
    },
  });
};

export const useEditProfileImgMutation = () => {
  const mutationcache = useEditProfileMutationCache();
  const notify = notificationApi();
  const user = JSON.parse(Cookies.get("user") as string);
  return useMutation({
    mutationKey: ["edit-profile-img"],
    mutationFn: async (data: { profileData: EditProfileData; image: File }) => {
      // Send profile data
      await mutationcache(data.profileData);

      const formData = new FormData();
      formData.append("image", data.image);

      // Send the image
      const res = await request
        .post("api/auth/edit-profile-img", formData)
        .then((res) => {
          Cookies.set(
            "user",
            JSON.stringify({ ...user, image: res.data.data.image })
          );
        });
    },
    onSuccess: (data) => {
      console.log(data);
      notify("edit-profile");
    },
    onError: (error: { status: number }) => {
      console.log(error);
    },
  });
};

