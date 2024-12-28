import {Box, Typography} from "@mui/material";
import HCaptcha from "./HCaptchaComponent.jsx";
import SignUpBackNext from "../Common/SignUpBackNext.jsx";
import AuthWarning from "../../AuthCommon/AuthWarning.jsx";
import {useState} from "react";
import useSignupThreeValidation from "./useSignupThreeValidation.js";

const StepThreeSignup = () => {
    const [failCaptcha, setFailCaptcha] = useState(false);
    const [touchCaptcha, setTouchCaptcha] = useState(false);
    const { handleNav } = useSignupThreeValidation();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'center',
                backgroundColor: 'white',
                paddingLeft: '60px',

            }}
        >
            <Box
                sx={{
                    marginRight: '200px'
                }}
            >
                <Typography
                    variant="h5"
                    fontFamily="Arial"
                    sx={{
                        fontSize: '12px',
                        fontWeight: 800,
                        color: 'rgb(102,102,102)'
                    }}
                >
                    Step 3 of 3
                </Typography>

                <Typography
                    variant="h4"
                    fontFamily="Arial"
                    sx={{
                        fontSize: '20px',
                        lineHeight: 'bold',
                        fontWeight: 800,
                        color: 'black'
                    }}
                >
                    Complete the challenge
                </Typography>

                <Box
                    sx={{
                        marginTop: '20px',
                    }}
                >
                    {(failCaptcha || touchCaptcha) && <AuthWarning warningType={'CAPTCHA'}/> }
                </Box>
                
                <HCaptcha setFailCaptcha={setFailCaptcha} setTouchCaptcha={setTouchCaptcha}/>

                <SignUpBackNext handleNav={handleNav}/>
            </Box>
        </Box>
    )
}

export default StepThreeSignup;