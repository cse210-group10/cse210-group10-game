import React from "react";

//consists of the numbered day only
interface CalendarButtonProps{
    dayNumber: number;
    isWork: boolean;
    onToggle: () => void
}


const CalendarButton: React.FC<CalendarButtonProps> = ({ dayNumber, isWork, onToggle }) => {

    //initial work setting to rest day / boolean state to be modified on click, starting at rest; no longer needed since all logic
    //goes to calendar-logic
    // const [isWork, setIsWork] = useState(false);

    //text swapping and color change
    const labelText = isWork ? "work" : "rest";
    const stylingType = isWork ? "calendar-button is-work" : "calendar-button is-rest";

    //return format of the CalendarButton objects for view
    return (
        <button className={stylingType} onClick={onToggle}>
            {/* Trying out a span to format the day number to look like mock-ups */}
            <span className="day-number-label"> {dayNumber} </span>
            {labelText}
        </button>
    );
};

export default CalendarButton; 