import { createContext, useState } from 'react';
const TripDateContext = createContext();

const TripDateProvider = ({ children }) => {
    const [activateDate,setActivateDate] = useState("");

    return (
        <TripDateContext.Provider value={{activateDate,setActivateDate}}>
            {children}
        </TripDateContext.Provider>
    );
};

export { TripDateContext, TripDateProvider };