import {Box, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff, Lock} from "@mui/icons-material";
import {useState} from "react";
import PropTypes from "prop-types";
import Tooltip from '@mui/material/Tooltip';

const PasswordFieldSignIn = ({password, setPassword}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Box>
            <OutlinedInput
                required
                type={showPassword ? 'text' : 'password'}
                className="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                sx={{
                    maxWidth: '450px',
                    marginTop: '10px',
                    width: '100%',
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Lock />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip title={showPassword ? "Hide password" : "Show password"}>
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
            />
        </Box>
    )
}

PasswordFieldSignIn.propTypes = {
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
};

export default PasswordFieldSignIn;