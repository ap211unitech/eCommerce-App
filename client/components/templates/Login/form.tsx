"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { useAuth } from "@/providers";
import { signInFormSchema } from "@/validations";

function LoginForm() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      identity: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { onSignIn, signInLoading: loading } = useAuth();

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    onSignIn(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="identity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Mobile</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com / 0123456789"
                  {...field}
                />
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
                <Input type="password" placeholder="**********" {...field} />
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
