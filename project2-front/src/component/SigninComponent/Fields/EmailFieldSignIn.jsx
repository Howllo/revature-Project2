import { OutlinedInput, InputAdornment, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export const EmailFieldSignIn = ({email, setEmail}) => {
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <Box>
            <OutlinedInput
                required
                type="email"
                className="email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
                placeholder="Enter your email address or username"
                sx={{
                    maxWidth: '450px',
                    marginTop: '10px',
                    width: '100%',
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                }
            />
        </Box>
    );
};

import PropTypes from 'prop-types';

EmailFieldSignIn.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
};

export default EmailFieldSignIn;