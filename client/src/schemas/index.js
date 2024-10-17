import { z } from "zod";

export const addTaskFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    priority: z.literal("low").or(z.literal("medium")).or(z.literal("high")),
    category: z
        .literal("personal")
        .or(z.literal("school"))
        .or(z.literal("work")),
});

export const editTaskFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    status: z
        .literal("todo")
        .or(z.literal("in progress"))
        .or(z.literal("done")),
    priority: z.literal("low").or(z.literal("medium")).or(z.literal("high")),
    category: z
        .literal("personal")
        .or(z.literal("school"))
        .or(z.literal("work")),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

export const registerSchema = z
    .object({
        fullName: z.string().min(1, { message: "Full Name is required." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." }),
        confirmPassword: z
            .string()
            .min(6, { message: "Confirm password must match password." }),
        role: z.enum(["admin", "manager", "user"], {
            message: "Role is required.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], // Set the path of the error
    });
