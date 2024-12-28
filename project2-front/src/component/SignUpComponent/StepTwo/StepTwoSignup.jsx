import {Box, Typography} from "@mui/material";
import {SignUpBackNext} from "../Common/SignUpBackNext.jsx";
import {UsernameField} from "./UsernameField.jsx";
import SignupUsernamePresent from "./SignupUsernamePresent.jsx";
import {useSignup} from "../Context/UseSignup.jsx";
import useSignupTwoValidation from "./useSignupTwoValidation.js";

export default function StepTwoSignup() {
    const { data, step, setStep } = useSignup();
    const { validateAll } = useSignupTwoValidation();

    const handleNav = async () => {
        const isValid = await validateAll();
        if (isValid) {
            setStep(step + 1);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            backgroundColor: 'white',
            paddingLeft: '60px',
        }}>
            <Box sx={{ marginRight: '200px' }}>
                <Typography
                    variant="h5"
                    fontFamily="Arial"
                    sx={{
                        fontSize: '12px',
                        fontWeight: 800,
                        color: 'rgb(102,102,102)'
                    }}
                >
                    Step 2 of 3
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
                    Choose a username
                </Typography>

                <UsernameField />

                {data.username && data.username.length > 0 ?
                    <SignupUsernamePresent username={data.username}/>
                    : null
                }

                <SignUpBackNext handleNav={handleNav}/>
            </Box>
        </Box>
    )
}