import { useContext } from "react";
import SignInContext from "./SignInProvider.jsx";

export const useSignIn = () =>{
    const context = useContext(SignInContext);
    if(!context){
        throw new Error("useSignIn must be used within a SignInProvider");
    }
    return context;
}

export default useSignIn;