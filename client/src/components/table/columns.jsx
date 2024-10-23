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
    TimerIcon,
    Pen,
    Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
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
import { useState } from "react";
import {
    CaretDownIcon,
    CaretSortIcon,
    CaretUpIcon,
} from "@radix-ui/react-icons";

export const columns = (fetcher) => [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Title
                <span className="font-bold text-xl">
                    {column.getIsSorted() === "desc" ? (
                        <CaretDownIcon />
                    ) : column.getIsSorted() === "asc" ? (
                        <CaretUpIcon />
                    ) : (
                        <CaretSortIcon />
                    )}
                </span>
            </Button>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Status
                <span className="font-bold text-xl">
                    {column.getIsSorted() === "desc" ? (
                        <CaretDownIcon />
                    ) : column.getIsSorted() === "asc" ? (
                        <CaretUpIcon />
                    ) : (
                        <CaretSortIcon />
                    )}
                </span>
            </Button>
        ),
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
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Priority
                <span className="font-bold text-xl">
                    {column.getIsSorted() === "desc" ? (
                        <CaretDownIcon />
                    ) : column.getIsSorted() === "asc" ? (
                        <CaretUpIcon />
                    ) : (
                        <CaretSortIcon />
                    )}
                </span>
            </Button>
        ),
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
        sortingFn: (rowA, rowB) => {
            const priorityLevels = {
                low: 1,
                medium: 2,
                high: 3,
            };
    
            const priorityA = priorityLevels[rowA.getValue("priority").toLowerCase()] || 0;
            const priorityB = priorityLevels[rowB.getValue("priority").toLowerCase()] || 0;
    
            return priorityA - priorityB;
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Category
                <span className="font-bold text-xl">
                    {column.getIsSorted() === "desc" ? (
                        <CaretDownIcon />
                    ) : column.getIsSorted() === "asc" ? (
                        <CaretUpIcon />
                    ) : (
                        <CaretSortIcon />
                    )}
                </span>
            </Button>
        ),
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
        accessorKey: "dueDate",
        header: ({ column }) => (
            <button
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Due Date
            </button>
        ),
        cell: ({ getValue }) => {
            const dueDate = new Date(getValue());
            return (
                <span className="flex gap-2 items-center">
                    {dueDate.toLocaleDateString()}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // access task data
            const task = row.original;
            const [isEditDialogOpen, setIsEditDialogOpen] = useState();

            return (
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                onClick={() => setIsEditDialogOpen(true)}
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {/* Edit Task */}
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Pen className="h-4 mr-1" />
                                    Edit Task
                                </DropdownMenuItem>
                            </DialogTrigger>
                            {/* Delete Task */}
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => deleteTask(fetcher, task.id)}
                            >
                                <Trash className="h-4 mr-1" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {/* Change Status */}
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Change Status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                changeTaskStatus(
                                                    fetcher,
                                                    task.id,
                                                    "todo"
                                                )
                                            }
                                        >
                                            <Square className="w-4 inline-block mr-1" />
                                            Todo
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                changeTaskStatus(
                                                    fetcher,
                                                    task.id,
                                                    "in-progress"
                                                )
                                            }
                                        >
                                            <TimerIcon className="w-4 inline-block mr-1" />
                                            In Progress
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                changeTaskStatus(
                                                    fetcher,
                                                    task.id,
                                                    "done"
                                                )
                                            }
                                        >
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
                        <EditTaskForm
                            closeDialog={() => setIsEditDialogOpen(false)}
                            task={task}
                        />
                    </DialogContent>
                </Dialog>
            );
        },
    },
];

const deleteTask = (fetcher, taskId) => {
    fetcher.submit(
        {
            action: "delete",
            taskId,
        },
        {
            method: "DELETE",
            action: "/tasks",
        }
    );
};

const changeTaskStatus = (fetcher, taskId, newStatus) => {
    fetcher.submit(
        {
            action: "mark-as",
            taskId,
            newStatus,
        },
        {
            method: "PATCH",
            action: "/tasks",
        }
    );
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

        case "in-progress": {
            return TimerIcon;
        }

        case "in progress": {
            return TimerIcon;
        }

        case "done": {
            return CheckSquare;
        }

        default:
            return "";
    }
};
