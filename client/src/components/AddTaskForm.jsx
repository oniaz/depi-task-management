import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addTask } from '../api/tasks';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; 

const AddTaskForm = () => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("todo");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("work");

    const handleSubmit = async () => {

        const newTask = {
            title,
            status,
            priority,
            category,
        };

        try {
            const addedTask = await addTask(newTask);
            console.log('Task added:', addedTask);

            setTitle("");
            setStatus("todo");
            setPriority("medium");
            setCategory("work");
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-2 rounded" 
            />

            <Select value={status} onValueChange={setStatus} className="mb-4"> 
                <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                </SelectContent>
            </Select>

            <Select value={priority} onValueChange={setPriority}  className="mb-4"> 
                <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}  className="my-40">
                <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" className="w-full">Add Task</Button>
        </form>
    );
};

export default AddTaskForm;
