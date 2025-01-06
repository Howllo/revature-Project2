import { useContext } from "react";
import GetSelectedData from "./GetSelectedData.jsx";

export const useSelectedData = () => {
    const context = useContext(GetSelectedData);
    if (!context) {
        throw new Error('useSelectedData must be used within a SearchProvider');
    }
    return context;
};

export default useSelectedData;