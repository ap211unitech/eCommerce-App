"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
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
import { FORGOT_PASSWORD_EMAIL_MAX_AGE } from "@/config/defaults";
import { FORGOT_PASSWORD_EMAIL } from "@/config/storage";
import * as mutations from "@/graphql/mutations";
import { getErrorMessage } from "@/utils";

import { ForgotPasswordResponse } from "./types";

const formSchema = z.object({
  identity: z.string().email(),
});

function ForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: "",
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;
  const [forgotPasswordMutation, { loading, error }] = useMutation(
    mutations.forgotPassword
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data }: ForgotPasswordResponse = await forgotPasswordMutation({
        variables: values,
      });
      if (data?.forgotPassword.message) {
        toast({
          description: data?.forgotPassword.message,
          variant: "success",
        });
        setCookie(FORGOT_PASSWORD_EMAIL, values.identity, {
          maxAge: FORGOT_PASSWORD_EMAIL_MAX_AGE,
        });
        setTimeout(() => {
          router.push("/resetPassword");
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
                  <Input placeholder="johndoe@gmail.com" {...field} />
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
                Sending OTP...
              </>
            ) : (
              <>Send OTP</>
            )}
          </Button>
        </form>
      </Form>
      {isSubmitSuccessful && !error && !loading && (
        <p className="pt-4 text-pink">
          Redirecting you to reset password page in 5 seconds....
        </p>
      )}
    </>
  );
}

export default ForgotPasswordForm;
