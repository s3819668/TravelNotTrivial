import { createContext, useState, useEffect } from 'react';
const ScheduleContext = createContext();

const ScheduleProvider = ({ children }) => {
    const initialData = JSON.parse(localStorage.getItem('schedules'));
    const [savedData, setSavedData] = useState(initialData);
    const [scheduleNames, setScheduleNames] = useState(initialData?.map(item => item.ScheduleName));
    const [activateScheduleName, setActivateScheduleName] = useState("New Schedule");

    useEffect(() => {
        setScheduleNames(savedData?.map(item => item.ScheduleName));
    }, [savedData]);

    const updateSavedData = (newData) => {
        setSavedData(newData);
        localStorage.setItem('schedules', JSON.stringify(newData));
    };

    return (
        <ScheduleContext.Provider value={{ savedData, setSavedData: updateSavedData, scheduleNames, setScheduleNames, activateScheduleName, setActivateScheduleName }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export { ScheduleContext, ScheduleProvider };

