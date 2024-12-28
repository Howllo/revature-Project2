import {Box, Button} from "@mui/material";
import {useSignInValidation} from "./useSignInValidation.js";

import PropTypes from "prop-types";

const SignInNavigator = ({email, password}) => {
    const {handleSubmit} = useSignInValidation()
    const {handleBack } = useSignInValidation();

    return (
        <Box>
            <Box
                sx={{
                    maxWidth: '450px',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleBack}
                    sx={{
                        backgroundColor: 'rgb(212,217,225)',
                        color: 'rgb(66, 87, 108)',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                    }}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleSubmit(email, password)}
                    sx={{
                        backgroundColor: 'rgb(56,155,253)',
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}

SignInNavigator.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default SignInNavigator;