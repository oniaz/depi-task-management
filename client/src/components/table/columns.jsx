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
    MonitorStopIcon,
    TimerIcon,
    Pen,
    Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import EditTaskForm from "../EditTaskForm";

import { capitalize } from "../../lib/utils";

export const columns = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = capitalize(getValue());
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
            const priority = capitalize(getValue());
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
            const category = capitalize(getValue());
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
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Pen className="h-4 mr-1" />
                                    Edit Task
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={deleteTask}
                            >
                                <Trash className="h-4 mr-1" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Change Status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Square className="w-4 inline-block mr-1" />
                                            Todo
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <TimerIcon className="w-4 inline-block mr-1" />
                                            In Progress
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CheckSquare className="w-4 inline-block mr-1" />
                                            Done
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>{" "}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                            <DialogDescription>
                                Edit tasks here. Click update when you&apos;re
                                finished
                            </DialogDescription>
                        </DialogHeader>
                        <EditTaskForm task={task} />
                    </DialogContent>
                </Dialog>
            );
        },
    },
];

const deleteTask = () => {
    console.log("task deleted");
};

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

        case "in progress": {
            return TimerIcon;
        }

        case "done": {
            return CheckSquare;
        }

        default:
            return;
    }
};
