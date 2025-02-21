import { createContext, useState } from 'react';
const SwitchRecommendContext = createContext();

const SwitchProvider = ({ children }) => {
    const [showRecommend,setShowRecommend] = useState(true);

    return (
        <SwitchRecommendContext.Provider value={{showRecommend,setShowRecommend}}>
            {children}
        </SwitchRecommendContext.Provider>
    );
};

export { SwitchRecommendContext, SwitchProvider };