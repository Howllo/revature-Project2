import {useAuth} from "../../util/auth/UseAuth.jsx";
import {UnauthContainer} from "../LeftSidebar/UnauthContainer/UnauthContainer.jsx";
import AuthContainer from "../LeftSidebar/AuthContainer/AuthContainer.jsx";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import FAB_ScrollReset from "../LeftSidebar/AuthContainer/FAB_ScrollReset.jsx";
import PropTypes from "prop-types";

export const AuthBarHandle = ({handleScrollUp, showFAB}) => {
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

        <Box>
            { handleNavDisplay() }
            { showFAB && <FAB_ScrollReset handleScrollUp={handleScrollUp} showFAB={showFAB}/> }
        </Box>

    )
}

AuthBarHandle.propTypes = {
    handleScrollUp: PropTypes.func.isRequired,
    showFAB: PropTypes.bool.isRequired,
};