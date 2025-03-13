import { createContext, useState } from 'react';
const LangContext = createContext();

const LangProvider = ({ children }) => {
    // const [activateLang,setActivateLang] = useState("en-us");
    const [activateLang,setActivateLang] = useState("zh-tw");

    return (
        <LangContext.Provider value={{activateLang, setActivateLang}}>
            {children}
        </LangContext.Provider>
    );
};

export { LangContext, LangProvider };

