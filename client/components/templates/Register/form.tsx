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
import { AUTH_TOKEN } from "@/config/storage";
import * as queries from "@/graphql/queries";
import { getErrorMessage } from "@/utils";

type SignUpResponse = {
  data?: {
    signUp: {
      _id: string;
      name: string;
      email: string;
      mobile: string;
      role: "user" | "admin" | "vendor";
      token: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

const TOKEN_MAX_AGE = 24 * 60 * 60;

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().trim().email(),
    mobile: z
      .string()
      .trim()
      .min(10, { message: "Phone must be exactly 10 digits long" })
      .max(10, { message: "Phone must be exactly 10 digits long" }),
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

function RegisterForm() {
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;
  const [signUpMutation, { loading }] = useMutation(queries.signUp);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data }: SignUpResponse = await signUpMutation({
        variables: values,
      });
      data?.signUp.token &&
        setCookie(AUTH_TOKEN, data?.signUp.token, { maxAge: TOKEN_MAX_AGE });
      router.push("/");
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
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
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="0123456789" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
              Creating account...
            </>
          ) : (
            <>Create account</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
