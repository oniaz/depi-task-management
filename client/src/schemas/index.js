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
