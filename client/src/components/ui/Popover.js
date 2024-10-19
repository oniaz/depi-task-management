import { useState } from "react";

export const Popover = ({ children }) => {
    const [open, setOpen] = useState(false);

    const togglePopover = () => {
        setOpen(!open);
    };

    return (
        <div className="relative">
            <div onClick={togglePopover}>
                {children[0]} {/* PopoverTrigger */}
            </div>
            {open && (
                <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg">
                    {children[1]} {/* PopoverContent */}
                </div>
            )}
        </div>
    );
};

export const PopoverTrigger = ({ asChild, children }) => {
    return asChild ? children : <div>{children}</div>;
};

export const PopoverContent = ({ children, className }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
};
