import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import AddTaskFrom from "./AddTaskForm";

const addTaskDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <span className="mr-2 text-xl font-bold">+</span>
                    Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add tasks here. Click add when you&apos;re finished
                    </DialogDescription>
                </DialogHeader>
                <AddTaskFrom />
            </DialogContent>
        </Dialog>
    );
};

export default addTaskDialog;
