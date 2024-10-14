import { z } from "zod";

export const addTaskFormSchema = z.object({
    title: z.string().min(2, { message: "Title is required" }),
    priority: z.literal("low").or(z.literal("medium")).or(z.literal("high")),
    category: z
        .literal("personal")
        .or(z.literal("school"))
        .or(z.literal("work")),
});
