import {
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    Briefcase,
    CheckSquare,
    MoreHorizontal,
    School,
    Square,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowUp,
    FaBriefcase,
    FaCheckSquare,
    FaSchool,
    FaSquare,
    FaUser,
} from "react-icons/fa";

export const columns = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue();
            const StatusIcon = getStatusIcon(status);

            return (
                <span className="flex gap-2 items-center">
                    <StatusIcon />
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ getValue }) => {
            const priority = getValue();
            const PriorityIcon = getPriorityIcon(priority);

            return (
                <span className="flex gap-2 items-center">
                    <PriorityIcon />
                    {priority}
                </span>
            );
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => {
            const category = getValue();
            const CategoryIcon = getCategoryIcon(category);

            return (
                <span className="flex gap-2 items-center">
                    <CategoryIcon />
                    {category}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // access task data
            const task = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => console.log("Hello, World!")}
                        >
                            Log Hello, World!
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Any other actions</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const getPriorityIcon = (priority) => {
    priority = priority.toLowerCase();
    switch (priority) {
        case "low": {
            return ArrowDown;
        }

        case "medium": {
            return ArrowLeft;
        }

        case "high": {
            return ArrowUp;
        }

        default:
            return;
    }
};

const getCategoryIcon = (category) => {
    category = category.toLowerCase();
    switch (category) {
        case "work": {
            return Briefcase;
        }

        case "school": {
            return School;
        }

        case "personal": {
            return User;
        }

        default:
            return;
    }
};

const getStatusIcon = (status) => {
    status = status.toLowerCase();
    switch (status) {
        case "todo": {
            return Square;
        }

        case "done": {
            return CheckSquare;
        }

        default:
            return;
    }
};
