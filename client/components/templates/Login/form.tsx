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
import { AUTH_TOKEN_MAX_AGE } from "@/config/defaults";
import { AUTH_TOKEN } from "@/config/storage";
import * as mutations from "@/graphql/mutations";
import { getErrorMessage } from "@/utils";

import { SignInResponse } from "./types";

const formSchema = z.object({
  identity: z.string(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 charcters long" }),
});

function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const [signInMutation, { loading }] = useMutation(mutations.signIn);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data }: SignInResponse = await signInMutation({
        variables: values,
      });
      if (data?.signIn.token) {
        setCookie(AUTH_TOKEN, data?.signIn.token, {
          maxAge: AUTH_TOKEN_MAX_AGE,
        });
        router.push("/");
        router.refresh();
        toast({
          description: `Successfully signed in !!`,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        description: `Uh oh! ${getErrorMessage(error)}`,
        variant: "destructive",
      });
    }
  }

  return (
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="**********" {...field} />
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
              Signing in...
            </>
          ) : (
            <>Sign In</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
