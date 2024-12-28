import { OutlinedInput, InputAdornment, IconButton, Typography, Box } from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';

export const PasswordField = ({
                                  value = '',
                                  onChange = () => {},
                                  error = false,
                                  touched = false,
                                  onBlur = () => {}
                              }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    marginTop: '10px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'rgb(66, 87, 108)'
                }}
            >
                Password
            </Typography>
            <OutlinedInput
                required
                type={showPassword ? 'text' : 'password'}
                className="password"
                placeholder="Enter your password"
                value={value}
                error={!error && touched}
                onBlur={onBlur}
                onChange={onChange}
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
    );
};

PasswordField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
    touched: PropTypes.bool,
};

export default PasswordField;