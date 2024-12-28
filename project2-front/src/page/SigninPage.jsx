import {Box, Grid2, Typography} from "@mui/material";
import SignInNavigator from "../component/SigninComponent/SignInNavigator.jsx";
import EmailFieldSignIn from "../component/SigninComponent/Fields/EmailFieldSignIn.jsx";
import PasswordFieldSignIn from "../component/SigninComponent/Fields/PasswordFieldSignIn.jsx";
import {useState} from "react";
import useSignIn from "../component/SigninComponent/Context/UseSignin.jsx";
import AuthWarning from "../component/AuthCommon/AuthWarning.jsx";

export function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { credentialsInvalid } = useSignIn();

    return (
        <Grid2
            id="layout-grid-top"
            container
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'grid',
                gridTemplateColumns: '3fr 5fr',
                backgroundColor: 'white',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: '40px',
                    backgroundColor: 'rgb(241,243,245)',
                }}
            >
                <Typography
                    variant="h3"
                    fontFamily="Inter, sans-serif"
                    sx={{
                        fontSize: '45px',
                        fontWeight: 800,
                        color: 'primary.main'
                    }}
                >
                    Sign in
                </Typography>
                <Typography
                    variant="h3"
                    fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
                    sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'black',
                        marginTop: '10px',
                    }}
                >
                    Welcome back! Enter your email or username and password
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'center',
                backgroundColor: 'white',
                paddingLeft: '60px',
                paddingRight: '40px',
            }}>

                {credentialsInvalid && <AuthWarning warningType={'AUTH_INVALID'}/> }

                <Typography
                    variant="h4"
                    sx={{
                        marginTop: '15px',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'rgb(66, 87, 108)'
                    }}
                >
                    Account
                </Typography>
                <EmailFieldSignIn email={email} setEmail={setEmail}/>
                <PasswordFieldSignIn password={password} setPassword={setPassword}/>
                <SignInNavigator email={email} password={password}/>
            </Box>
        </Grid2>
    )
}