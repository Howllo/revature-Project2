import {Link} from "react-router-dom";
import {Box, Button} from "@mui/material";
import "./AuthButtons.css";

const AuthButtons = () => {
    return (
        <Box className="AuthButtonsContainer">
            <Link to="/signup">
                <Button className="SignupButton" variant="contained" size="small">
                    Sign up
                </Button>
            </Link>
            <Link to="/signin">
                <Button className="SigninButton" variant="contained" size="small">
                    Sign in
                </Button>
            </Link>
        </Box>
    )
}

export default AuthButtons;