import {useAuth} from "../../util/auth/UseAuth.jsx";
import {UnauthContainer} from "../LeftSidebar/UnauthContainer/UnauthContainer.jsx";
import AuthContainer from "../LeftSidebar/AuthContainer/AuthContainer.jsx";
import {useEffect, useState} from "react";

export const AuthBarHandle = () => {
    const { isAuthenticated } = useAuth();
    const [, setForceUpdate] = useState({})

    useEffect(() => {
        setForceUpdate({});
    }, [isAuthenticated]);

    const handleNavDisplay = () => {
        if (isAuthenticated) {
            return <AuthContainer/>
        } else {
            return <UnauthContainer/>
        }
    }

    return (
        handleNavDisplay()
    )
}