import {Avatar, Box, Typography} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RocketIcon from "@mui/icons-material/Rocket";
import {useState} from "react";
import {Link} from "react-router-dom";
import AuthButtons from "./AuthButtons.jsx";
import SelectLanguage from "../../LanguageChoose/SelectLanguage.jsx";
import "./UnauthContainer.css";

export function UnauthContainer() {
    const [hover, setHover] = useState(false);
    return(
        <Box className="UnauthContainer">
            <Link to="/"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
            >
                <Avatar>
                    {hover ? <RocketLaunchIcon/> : <RocketIcon/>}
                </Avatar>
            </Link>

            <Typography variant="h3" fontFamily="Inter, sans-serif" className="ParticipateTitle">
                Participate in discussion
            </Typography>

            <AuthButtons/>
            <Box className="SelectLanguageContainer">
                <SelectLanguage/>
            </Box>
        </Box>
    )
}