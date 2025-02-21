import { createContext, useState } from 'react';
const LangContext = createContext();

const LangProvider = ({ children }) => {
    const [activateLang,setActivateLang] = useState("en-us");

    return (
        <LangContext.Provider value={{activateLang, setActivateLang}}>
            {children}
        </LangContext.Provider>
    );
};

export { LangContext, LangProvider };

