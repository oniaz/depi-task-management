import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
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

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleGoogleLogin = () => {
        console.log("Login with Google");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mt-8 w-full md:w-8/12 lg:w-6/12 space-y-4 bg-card p-8 rounded-lg border border-gray-800"
            >
                <h1 className="text-2xl font-bold mb-4 text-foreground">
                    Login
                </h1>

                {/* Email Field */}
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

                {/* Password Field */}
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

                <div className="flex flex-col">
                    <div className="mt-8 space-y-4">
                        {/* Login Button */}
                        <Button className="w-full" type="submit">
                            Login
                        </Button>

                        {/* Login with Google Button */}
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle className="mr-1 mt-0.5" />
                            Login with Google
                        </Button>
                    </div>
                </div>

                {/* Register Link */}
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
