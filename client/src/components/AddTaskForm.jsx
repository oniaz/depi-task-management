import { useForm } from "react-hook-form";
import { addTaskFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react"

import {
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    Briefcase,
    Loader2,
    School,
    User,
} from "lucide-react";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetcher, useNavigation } from "react-router-dom";
import { useEffect } from "react";

const AddTaskForm = ({ closeDialog }) => {
    const form = useForm({
        resolver: zodResolver(addTaskFormSchema),
        defaultValues: {
            title: "",
            priority: "",
            category: "",
            dueDate: new Date(),
        },
    });

    const fetcher = useFetcher();
    const isAdding =
        fetcher.state === "submitting" || fetcher.state === "loading";

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            closeDialog();
        }
    }, [fetcher]);

    const onSubmit = (values) => {
        // TODO: Api calls
        fetcher.submit(
            { action: "add", ...values },
            { method: "POST", action: "/tasks" }
        );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                method="post"
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Todo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a priority" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="low">
                                        <ArrowDown className="w-4 inline-block mb-1 mr-1" />
                                        Low
                                    </SelectItem>
                                    <SelectItem value="medium">
                                        <ArrowLeft className="w-4 inline-block mb-1 mr-1" />
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="high">
                                        <ArrowUp className="w-4 inline-block mb-1 mr-1" />
                                        High
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="personal">
                                        <User className="w-4 inline-block mb-1 mr-1" />
                                        Personal
                                    </SelectItem>
                                    <SelectItem value="school">
                                        <School className="w-4 inline-block mb-1 mr-1" />
                                        School
                                    </SelectItem>
                                    <SelectItem value="work">
                                        <Briefcase className="w-4 inline-block mb-1 mr-1" />
                                        Work
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        <CalendarIcon />
                                        {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={field.value ? new Date(field.value) : null} onSelect={date => {
                                        field.onChange(date);
                                    }} />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isAdding} className="w-full" type="submit">
                    {isAdding && <Loader2 className="w-4 mr-2 animate-spin" />}
                    Add Task
                </Button>
            </form>
        </Form>
    );
};

export default AddTaskForm;
