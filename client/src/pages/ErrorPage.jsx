import { AlertTriangle, Loader2 } from "lucide-react";
import { Link, useNavigation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
    const { state } = useNavigation();
    const isLoading = state === "loading" || state === "submitting";

    return (
        <div className="w-[300px] md:w-[600px] p-32 my-32 mx-auto rounded-xl bg-gray-900 border border-gray-800">
            <div className="flex flex-col justify-center gap-8">
                <AlertTriangle className="w-full h-32 text-red-400" />
                <h1 className="text-2xl text-center">Something went wrong!</h1>
                <Button disabled={isLoading} variant="outline">
                    {isLoading && <Loader2 className="w-4 animate-spin mr-2" />}
                    <Link to="/">Go Back to Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
