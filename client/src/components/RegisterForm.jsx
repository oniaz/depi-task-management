"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user", // Default role
        },
    });

    const onSubmit = (data) => {
        console.log(data); // Replace this with your registration API call logic
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mt-32 w-full md:w-8/12 lg:w-6/12 space-y-4 bg-card p-8 rounded-lg border border-gray-800"
            >
                <h1 className="text-2xl font-bold mb-4 text-foreground">
                    Register
                </h1>

                {/* Full Name */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Register Button */}
                <div>
                    <Button type="submit" className="mt-8 w-full">
                        Register
                    </Button>
                </div>

                {/* Already Registered Link */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link className="text-primary cursor-pointer hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;
