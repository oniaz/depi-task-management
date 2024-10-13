import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const AddTaskDialog = ({ isDialogOpen, closeDialog }) => {
    const [task, setTask] = useState({
        title: "",
        status: "",
        priority: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePriorityChange = (value) => {
        setTask((prev) => ({
            ...prev,
            priority: value,
        }));
    };

    const handleCategoryChange = (value) => {
        setTask((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Task submitted:", task);
        closeDialog();
    };

    if (!isDialogOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 rounded-lg shadow-lg w-[450px]">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Title of your task"
                                        value={task.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="status">Status</Label>
                                    <Input
                                        id="status"
                                        name="status"
                                        placeholder="Status of your task"
                                        value={task.status}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex flex-col space-y-1.5">
                                        <Select onValueChange={handlePriorityChange}>
                                            <SelectTrigger id="priority">
                                                <SelectValue placeholder="Select Priority" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="category">Category</Label>
                                    <Select onValueChange={handleCategoryChange}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="work">Work</SelectItem>
                                            <SelectItem value="personal">Personal</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button type="submit" className="mt-4">Save Task</Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={closeDialog}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default AddTaskDialog;
