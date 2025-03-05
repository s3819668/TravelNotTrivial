import { createContext, useState } from 'react';
const AttractionContext = createContext();

const AttractionProvider = ({ children }) => {
    const [attractions, setAttractions] = useState([]);

    return (
        <AttractionContext.Provider value={{attractions,setAttractions}}>
            {children}
        </AttractionContext.Provider>
    );
};

export { AttractionContext, AttractionProvider };