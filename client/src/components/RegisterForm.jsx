"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            // role: "user", 
        },
    });

    const onSubmit = async (data) => {
        setLoading(true); 
        setError(null); 


        const registrationData = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        try {
            const response = await axios.post('https://depi-task-management-api-simplified.vercel.app/api/user/register', registrationData);
            console.log('Registration successful:', response.data);
            alert('Registered successfully!'); 
            navigate("/login");
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle specific error messages based on API response
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data.message || 'Registration failed';
                
                if (status === 400) {
                    setError(message);
                } else if (status === 500) {
                    setError('Server error. Please try again later.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } else {
                // Handle network errors or if no response was received
                setError('Network error. Please check your connection.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mt-8 w-full md:w-8/12 lg:w-6/12 space-y-4 bg-card p-8 rounded-lg border border-gray-800"
            >
                <h1 className="text-2xl font-bold mb-4 text-foreground">Register</h1>

                <FormField
                    control={form.control}
                    name="name"
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

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <div>
                    <Button type="submit" className="mt-8 w-full" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary cursor-pointer hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;
