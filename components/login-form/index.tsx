"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLoginMutation } from "@/request/mutation";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Valid email required",
  }),
  password: z.string().min(8, {
    message: "8+ characters required",
  }),
});

const LoginForm = () => {
  const { mutate, isPending } = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => 
    await mutate(data);

  return (
    <div className="mx-auto w-full max-w-sm space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          CRM Portal
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Internal use only
        </p>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-800 dark:text-neutral-200">
                    Work Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900"
                      placeholder="name@company.com"
                      type="email"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-800 dark:text-neutral-200">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
            
            <Button
              disabled={isPending}
              className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              type="submit"
            >
              {isPending ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Access CRM
            </Button>
          </form>
        </Form>
      </div>

      <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        Contact IT if you need access
      </p>
    </div>
  );
};

export default LoginForm;