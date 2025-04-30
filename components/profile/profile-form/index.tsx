import {useForm} from "react-hook-form"
import {useState} from "react"
import {EditIcon} from "lucide-react"
import Cookies from "js-cookie"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

import {useEditProfileMutation} from "@/request/mutation"

export interface EditProfileData {
    first_name: string
    last_name: string
    email: string
}

interface User {
    _id: string
    first_name: string
    last_name: string
    email: string
    image: string
    role: string
    status: string
    active: boolean
}

export function ProfileForm({user}: {user: User}) {
    const [isReadOnly, setIsReadOnly] = useState(true)

    const form = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        },
    })

    const {control, handleSubmit, getValues, setValue} = form
    const {mutate} = useEditProfileMutation()

    const onSubmit = () => {
        const values = getValues()

        const editData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
        }

        Cookies.set("user", JSON.stringify({...user, ...editData}), {
            expires: 1,
        })

        try {
            mutate(editData)
        } catch (error) {
            console.error(error)
        }

        setIsReadOnly(true)
    }

    const handleEditClick = () => {
        setIsReadOnly(!isReadOnly)

        if (isReadOnly) {
            setValue("first_name", user.first_name)
            setValue("last_name", user.last_name)
            setValue("email", user.email)
            setValue("role", user.role)
        }
    }

    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>Profil malumotlari</CardTitle>
                    <CardDescription>
                        Shaxsiy malumotlaringizni korishingiz yoki
                        tahrirlashingiz mumkin.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    className="w-[fit-content] cursor-pointer"
                    onClick={handleEditClick}>
                    <EditIcon />
                </Button>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={control}
                                name="first_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Ism</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                readOnly={isReadOnly}
                                                placeholder="Ism"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Familiya</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                readOnly={isReadOnly}
                                                placeholder="Familiya"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                readOnly={isReadOnly}
                                                placeholder="Email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="role"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Rol</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                readOnly
                                                placeholder="Rol"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {!isReadOnly && (
                            <div className="flex justify-end">
                                <Button type="submit">Saqlash</Button>
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}