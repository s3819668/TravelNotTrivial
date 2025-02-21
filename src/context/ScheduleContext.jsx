import { createContext, useState } from 'react';
const ScheduleContext = createContext();

const ScheduleProvider = ({ children }) => {
    if (!localStorage.getItem('schedules') || JSON.parse(localStorage.getItem('schedules')).length==0) {
        localStorage.setItem('schedules', '[{"ScheduleName": "東京", "ScheduleDetail": []}, {"ScheduleName": "大阪", "ScheduleDetail": []}]');
    }
    const savedData = JSON.parse(localStorage.getItem('schedules'));
    const [schedules, setSchedules] = useState(savedData?.map(item => item.ScheduleName));
    const [activateSchedule,setActivateSchedule] = useState("New Schedule");

    return (
        <ScheduleContext.Provider value={{savedData, schedules, setSchedules,activateSchedule,setActivateSchedule }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export { ScheduleContext, ScheduleProvider };

