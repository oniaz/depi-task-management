import { useState } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";

const Calendar = ({ selected, onSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = (date) => {
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        const days = [];
        for (let i = monthStart; i <= monthEnd; i.setDate(i.getDate() + 1)) {
            days.push(new Date(i));
        }
        return days;
    };

    const handleDayClick = (day) => {
        onSelect(day);
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const days = daysInMonth(currentMonth);

    return (
        <div className="p-4">
            <div className="flex justify-between">
                <button onClick={handlePreviousMonth}>{"<"}</button>
                <span>{format(currentMonth, "MMMM yyyy")}</span>
                <button onClick={handleNextMonth}>{">"}</button>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-4">
                {days.map((day) => (
                    <button
                        key={day}
                        className={`p-2 rounded ${selected?.toDateString() === day.toDateString() ? "bg-blue-500 text-white" : ""}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day.getDate()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
