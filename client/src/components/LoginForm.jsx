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
import { loginSchema } from "../schemas";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useSession from "../hooks/useSession";

const LoginForm = () => {
    const { login } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://depi-task-management-api-simplified.vercel.app/api/user/login',
                {
                    email: data.email,
                    password: data.password,
                }
            );
            login(response.data.jwtToken);
            alert('Logged in successfully!');
        } catch (error) {
            const message = error.response?.data?.message;
            setError(message === "User not found" || message === "Invalid credentials" 
                ? "The email or password you entered is incorrect." 
                : "Something went wrong. Please try again later."
            );
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
                <h1 className="text-2xl font-bold mb-4 text-foreground">Login</h1>

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
                                    aria-required
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
                                    aria-required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary cursor-pointer hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
