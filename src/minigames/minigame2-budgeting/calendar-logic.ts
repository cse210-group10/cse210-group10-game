import {useState} from 'react';

export const useCalendarLogic = (initialDays: number) => {
    //array of false boolean values from the calendar
    const [workDays, setWorkDays] = useState(new Array(initialDays).fill(false))

    //logic flip value at specific array index
    const toggleDay = (index: number) => {
        const updatedDays = [...workDays];
        updatedDays[index] = !updatedDays[index];
        setWorkDays(updatedDays);
    };

    //counter for counting number of work days by checking for true values and incrementing
    const totalWorkDays = workDays.filter(day => day === true).length;

    return {workDays, toggleDay, totalWorkDays};
};