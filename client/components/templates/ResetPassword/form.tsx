"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCookie, getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useToast } from "@/components/atoms/use-toast";
import { FORGOT_PASSWORD_EMAIL } from "@/config/storage";
import * as mutations from "@/graphql/mutations";
import { getErrorMessage } from "@/utils";

import { ResetPasswordResponse } from "./types";

const formSchema = z
  .object({
    identity: z.string().email(),
    otp: z
      .string()
      .min(4, { message: "Password must be 4 digits long" })
      .max(4, { message: "Password must be 4 digits long" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 charcters long" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

function ForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();

  const identity = getCookie(FORGOT_PASSWORD_EMAIL);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity,
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;
  const [resetPasswordMutation, { loading, error }] = useMutation(
    mutations.resetPassword
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data }: ResetPasswordResponse = await resetPasswordMutation({
        variables: { ...values, newPassword: values.password },
      });
      if (data?.resetPassword.message) {
        toast({
          description: data?.resetPassword.message,
          variant: "success",
        });
        deleteCookie(FORGOT_PASSWORD_EMAIL);
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    } catch (error) {
      toast({
        description: `Uh oh! ${getErrorMessage(error)}`,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="identity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email OTP</FormLabel>
                <FormControl>
                  <Input placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="gap-2"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? (
              <>
                <Loader2 className="animate-spin mx-auto" size={20} />
                Reset OTP...
              </>
            ) : (
              <>Reset OTP</>
            )}
          </Button>
        </form>
      </Form>
      {isSubmitSuccessful && !error && !loading && (
        <p className="pt-4 text-pink">
          Redirecting you to login page in 5 seconds....
        </p>
      )}
    </>
  );
}

export default ForgotPasswordForm;
