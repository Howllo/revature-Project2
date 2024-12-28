import { useContext } from "react";
import NavContext from "./NavContext.jsx";

export const useNav = () =>{
    const context = useContext(NavContext);
    if(!context){
        throw new Error("useNav must be used within a NavContext");
    }
    return context;
}

export default useNav;