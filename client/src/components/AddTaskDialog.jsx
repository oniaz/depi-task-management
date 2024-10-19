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
import { useState } from "react";

const AddTaskDialog = () => {
    const [dialogOpen, setDialogOpen] = useState();

    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={openDialog}>
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
                <AddTaskFrom closeDialog={closeDialog} />
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskDialog;
