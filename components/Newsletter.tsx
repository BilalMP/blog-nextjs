"use client";

import { newsletterSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";

const Newsletter = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newsletterSchema>>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof newsletterSchema>) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    toast.success(data.message);
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (errorData.error) {
                        toast.error(errorData.error);
                    } else {
                        toast.error("Sign In failed.");
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An unexpected error occurred.");
            }
        });
    };

    return (
        <section className="py-10 md:py-16 px-6 md:px-10 bg-primary text-primary-foreground rounded-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                    Subscribe to our newsletter
                </h2>
                <p className="text-primary-foreground/80 text-lg">
                    Stay updated with our latest articles and news.
                </p>
                <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center justify-center"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                {...field}
                                                type="email"
                                                className="px-4 py-3 rounded-md bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 w-[300px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="px-5 py-3 rounded-md bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors w-1/3"
                            >
                                Subscribe
                            </Button>
                        </form>
                </Form>
            </div>
        </section>
    );
};

export default Newsletter;
