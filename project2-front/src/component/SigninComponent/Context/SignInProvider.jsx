import {createContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const SignInContext  = createContext(null);

export const SighInProvider = ({children}) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [credentialsInvalid, setCredentialsInvalid] = useState(false)

    const location = useLocation();
    useEffect(() => {
        const isLeavingSignup = !location.pathname.includes("signup") && data.email !== "";

        if(isLeavingSignup) {
            setData({
                email: "",
                password: "",
            });
            setCredentialsInvalid(false);
        }
    }, [location, data.email]);

    const value = {
        data,
        setData,
        credentialsInvalid,
        setCredentialsInvalid
    }

    return (
        <SignInContext.Provider value={value}>
            {children}
        </SignInContext.Provider>
    )
}

SighInProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SignInContext;