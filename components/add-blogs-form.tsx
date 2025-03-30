"use client";

import { blogSchema } from "@/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

const AddBlogForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            coverImage: "",
            readingTime: "",
            categories: "",
        },
    });

    const onSubmit = (values: z.infer<typeof blogSchema>) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/add-blog", {
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
                    console.log(errorData);
                    toast.error(errorData.error || "Failed to add blog.");
                }
            } catch (error) {
                console.error("Error adding blog:", error);
                toast.error("An unexpected error occurred.");
            }
        });
    };

    return (
        <Card className="w-[600px] mx-auto">
            <CardHeader>
                <CardTitle>Add New Blog</CardTitle>
                <CardDescription>
                    Fill in the details to create a new blog post.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter blog title"
                                            {...field}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Excerpt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter blog description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Post Content"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Coverm Image URL"
                                            {...field}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="readingTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reading Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Reading Time"
                                            {...field}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter categories separated by commas"
                                            {...field}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isPending}
                            className="w-full"
                            size="lg"
                            type="submit"
                        >
                            Add Blog
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center items-center"></CardFooter>
        </Card>
    );
};

export default AddBlogForm;
