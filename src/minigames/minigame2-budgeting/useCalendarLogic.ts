import {useState} from 'react';

export const useCalendarLogic = (initialDays: number) => {
    
    //safeguard to ensure that array is made with proper values (bug fixed)
    const minDays = Math.max(5, initialDays);

    //array of false boolean values from the calendar using useState [variable, setter] = value;
    const [workDays, setWorkDays] = useState(new Array(minDays).fill(false));

    //logic flip value at specific array index
    const toggleDay = (index: number) => {
        //ensures that the index is a valid value and never accesses outside array range (bug fixed)
        if (index >= 0 && index < workDays.length ) {
        const updatedDays = [...workDays];
        updatedDays[index] = !updatedDays[index];
        setWorkDays(updatedDays);
        //this should never happen
        }else{
            alert("Bug found. report.");
        }
    };

    //reset calendar-button values (on answer submission)
    const resetButtons = () => setWorkDays(new Array(minDays).fill(false));

    //counter for counting number of work days by checking for true values and incrementing
    const totalWorkDays = workDays.filter(day => day === true).length;

    return {workDays, totalWorkDays, toggleDay, resetButtons};
};