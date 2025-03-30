"use client";

import { registerUserSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formFields: {
    name: "name" | "email" | "password" | "image" | "role";
    label: string;
    placeholder: string;
    type?: "text" | "email" | "password";
}[] = [
    { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
    {
        name: "email",
        label: "Email",
        placeholder: "example@example.com",
        type: "email",
    },
    { name: "image", label: "Image", placeholder: "Image URL", type: "text" },
    { name: "role", label: "Role", placeholder: "User Role", type: "text" },
    {
        name: "password",
        label: "Password",
        placeholder: "*****",
        type: "password",
    },
];

const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            name: "",
            email: "",
            image: "",
            role: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerUserSchema>) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/register-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    toast.success("Registration successful!");
                    form.reset();
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || "Registration failed.");
                }
            } catch (error) {
                console.error("Registration error:", error);
                toast.error("An unexpected error occurred.");
            }
        });
    };

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {formFields.map(
                            ({ name, label, placeholder, type }) => (
                                <FormField
                                    key={name}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={placeholder}
                                                    {...field}
                                                    type={type}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        )}
                        <Button
                            disabled={isPending}
                            className="w-full"
                            size="lg"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="fl;ex justify-center items-center">
                <Link
                    href="/login"
                    className="text-xs hover:underline text-gray-600"
                >
                    Already have an account
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RegisterForm;
