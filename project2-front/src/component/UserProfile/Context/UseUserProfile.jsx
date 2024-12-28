import { useContext } from "react";
import UserProfileContext from "./UserProfileProvider.jsx";

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};