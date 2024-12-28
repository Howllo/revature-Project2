import {Avatar, Box, Grid2, Typography} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RocketIcon from "@mui/icons-material/Rocket";
import {useState} from "react";
import {Link} from "react-router-dom";
import AuthButtons from "./AuthButtons.jsx";
import SelectLanguage from "../../LanguageChoose/SelectLanguage.jsx";

export function UnauthContainer() {
    const [hover, setHover] = useState(false);
    return(
        <Grid2 container justifyContent="right">
            <Box
                sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                }}
            >
                <Link to="/"
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                >
                    <Avatar>
                        {hover ? <RocketLaunchIcon/> : <RocketIcon/>}
                    </Avatar>
                </Link>

                <Typography
                    variant="h3"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        marginTop: '20px',
                        fontSize: '25px',
                        fontWeight: 800,
                        color: 'black'
                    }}
                >
                    Participate in discussion
                </Typography>

                <AuthButtons/>
                <Box
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    <SelectLanguage/>
                </Box>
            </Box>
        </Grid2>
    )
}