import * as z from "zod";

export const contactSchema = z.object({
    name: z.string().min(1).max(100, {
        message: "Name must be between 1 and 100 characters",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(1).max(100, {
        message: "Subject must be between 1 and 100 characters",
    }),
    message: z.string().min(1).max(500, {
        message: "Message must be between 1 and 500 characters",
    }),
})

export const newsletterSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

export const registerUserSchema = z.object({
    name: z.string().min(1).max(100, {
        message: "Name must be between 1 and 100 characters",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    image: z.string({ message: "Image is required" }),
    role: z.string({ message: "Role is required" }),
})

export const categorySchema = z.object({
    name: z.string().min(1).max(100, {
        message: "Name must be between 1 and 100 characters",
    }),
})

export const commentSchema = z.object({
    name: z.string().min(1).max(100, {
        message: "Name must be between 1 and 100 characters",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(1).max(500, {
        message: "Message must be between 1 and 500 characters",
    }),
})

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    })
})

export const blogSchema = z.object({
    title: z.string().min(1).max(100, {
        message: "Title must be between 1 and 100 characters",
    }),
    excerpt: z.string().min(1).max(500, { 
        message: "Excerpt must be between 1 and 500 characters",
    }),
    content: z.string().min(1, {
        message: "Content is required",
    }),
    coverImage: z.string().min(1, {
        message: "Cover image is required",
    }),
    readingTime: z.string().min(1, {
        message: "Reading time is required",
    }),
    categories: z.string().min(1, {
        message: "At least one category is required",
    }),
})
