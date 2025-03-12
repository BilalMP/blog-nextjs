"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { contactSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

const ContactForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = (values: z.infer<typeof contactSchema>) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/contact", {
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
                        toast.error("Please try again later");
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An unexpected error occurred.");
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Get in touch
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have a question or feedback? We'd love to hear from you.
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-secondary/50 p-6 rounded-lg">
                        <h2 className="font-semibold text-xl mb-6">
                            Contact Information
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-md mr-4">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Email</p>
                                    <Link
                                        href={"mailto:YD3vK@example.com"}
                                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                                    >
                                        example@example.com
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-md mr-4">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Phone</p>
                                    <Link
                                        href="tel:1234567890"
                                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                                    >
                                        123456789
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-md mr-4">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">
                                        Location
                                    </p>
                                    <p className="text-muted-foreground text-sm hover:text-primary transition-colors">
                                        Mauritius
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card className="lg:col-span-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 bg-card p-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Your Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
                                                />
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
                                            <FormLabel className="text-sm font-medium">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
                                                    {...field}
                                                    type="email"
                                                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Subject
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
                                                    {...field}
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Message
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="john@example.com"
                                                    {...field}
                                                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                size="lg"
                                disabled={isPending}
                                type="submit"
                                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                            >
                                {isPending ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        Send Message{" "}
                                        <Send className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ContactForm;
