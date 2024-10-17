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
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { StopwatchIcon } from "@radix-ui/react-icons";
import { capitalize } from "../../lib/utils";
import { deleteTask, updateTask } from "../../api/tasks"; // تأكد من استيراد الدوال

const iconMap = {
    status: {
        todo: Square,
        "in progress": StopwatchIcon,
        done: CheckSquare,
    },
    priority: {
        low: ArrowDown,
        medium: ArrowLeft,
        high: ArrowUp,
    },
    category: {
        work: Briefcase,
        school: School,
        personal: User,
    },
};

const IconWithText = ({ icon: Icon, text }) => (
    <span className="flex gap-2 items-center">
        {Icon && <Icon />}
        {text}
    </span>
);

const SelectField = ({ label, name, value, options, onValueChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium">
            {label}
        </label>
        <Select name={name} value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

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
            const StatusIcon = iconMap.status[status.toLowerCase()];
            return <IconWithText icon={StatusIcon} text={status} />;
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ getValue }) => {
            const priority = capitalize(getValue());
            const PriorityIcon = iconMap.priority[priority.toLowerCase()];
            return <IconWithText icon={PriorityIcon} text={priority} />;
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => {
            const category = capitalize(getValue());
            const CategoryIcon = iconMap.category[category.toLowerCase()];
            return <IconWithText icon={CategoryIcon} text={category} />;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original;
            const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
            const [openEditDialog, setOpenEditDialog] = useState(false);
            const [editedTask, setEditedTask] = useState({ ...task });

            const handleDelete = async () => {
                await deleteTask(task.id);
                setOpenDeleteDialog(false);
                // يمكنك إضافة كود لإعادة تحميل المهام أو تحديث الحالة
            };

            const handleEditSubmit = async (e) => {
                e.preventDefault();
                await updateTask(task.id, editedTask); // تمرير ID المهمة
                setOpenEditDialog(false);
                // يمكنك إضافة كود لإعادة تحميل المهام أو تحديث الحالة
            };

            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
            };

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
                        <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
                            Update
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                    <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                        <AlertDialogTrigger asChild />
                        <AlertDialogContent>
                            <p>Are you sure you want to delete the task "{task.title}"?</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Confirm
                                </AlertDialogAction>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Dialog for editing the task */}
                    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                        <DialogTrigger asChild />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Task</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium">
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={editedTask.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <SelectField
                                    label="Status"
                                    name="status"
                                    value={editedTask.status}
                                    onValueChange={(value) => setEditedTask((prevTask) => ({ ...prevTask, status: value }))}
                                    options={[
                                        { value: "todo", label: "To Do" },
                                        { value: "in progress", label: "In Progress" },
                                        { value: "done", label: "Done" },
                                    ]}
                                />

                                <SelectField
                                    label="Priority"
                                    name="priority"
                                    value={editedTask.priority}
                                    onValueChange={(value) => setEditedTask((prevTask) => ({ ...prevTask, priority: value }))}
                                    options={[
                                        { value: "low", label: "Low" },
                                        { value: "medium", label: "Medium" },
                                        { value: "high", label: "High" },
                                    ]}
                                />

                                <SelectField
                                    label="Category"
                                    name="category"
                                    value={editedTask.category}
                                    onValueChange={(value) => setEditedTask((prevTask) => ({ ...prevTask, category: value }))}
                                    options={[
                                        { value: "work", label: "Work" },
                                        { value: "school", label: "School" },
                                        { value: "personal", label: "Personal" },
                                    ]}
                                />

                                <DialogFooter>
                                    <Button type="submit">Save</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </DropdownMenu>
            );
        },
    },
];
