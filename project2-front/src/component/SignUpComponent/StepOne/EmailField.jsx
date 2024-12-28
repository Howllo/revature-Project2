import { OutlinedInput, InputAdornment, Typography, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PropTypes from 'prop-types';

export const EmailField = ({
                               value = '',
                               onChange = () => {},
                               error = false,
                               touched = false,
                               onBlur = () => {}
}) => {
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
                Email
            </Typography>
            <OutlinedInput
                required
                value={value}
                type="email"
                className="email"
                placeholder="Enter your email address"
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
                        <EmailIcon />
                    </InputAdornment>
                }
            />
        </Box>
    );
};

EmailField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    touched: PropTypes.bool,
    onBlur: PropTypes.func
};

export default EmailField;