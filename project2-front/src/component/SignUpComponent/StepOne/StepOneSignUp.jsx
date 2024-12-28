import {Box, Typography} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useSignup } from '../Context/UseSignup.jsx';
import useSignupValidation from "./useSignupValidation.js";
import EmailField from "./EmailField.jsx";
import PasswordField from "./PasswordField.jsx";
import AuthWarning from "../../AuthCommon/AuthWarning.jsx";
import SignUpBackNext from "../Common/SignUpBackNext.jsx";
import dayjs from "dayjs";
import {useState} from "react";

export const StepOneSignUp = () => {
    const { data, setData, step, setStep } = useSignup();
    const { errors, touched, errorStatus,
        handleBlur, validateAll } = useSignupValidation(data);
    const [currentData] = useState(dayjs().subtract(18, 'years'));

    const handleEmailChange = (e) => {
        setData({
            ...data,
            email: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setData({
            ...data,
            password: e.target.value
        });
    };

    const handleBirthDateChange = (newValue) => {
        setData({
            ...data,
            birthdate: newValue
        });
    };

    const handleNav = async () => {
        const isValid = await validateAll();
        if (isValid && data.email  && data.password && data.birthdate) {
            setStep(step + 1);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            backgroundColor: 'white',
            paddingLeft: '60px',
            paddingRight: '40px',
        }}>
            <Typography variant="h5"
                        sx={{
                            fontSize: '12px',
                            fontWeight: 800,
                            color: 'rgb(102,102,102)'
                        }}
            >Step 1 of 3</Typography>
            <Typography variant="h4"
                sx={{
                    fontSize: '20px',
                    lineHeight: 'bold',
                    fontWeight: 800,
                    color: 'black',
                    marginTop: '10px',
                    marginBottom: '40px',
                }}
            >Create Account</Typography>

            {errorStatus && <AuthWarning warningType={errorStatus} />}

            <EmailField
                value={data.email || ''}
                onChange={(e) => handleEmailChange(e)}
                error={errors.email}
                touched={touched.email}
                onBlur={() => handleBlur('email')}
            />

            <PasswordField
                value={data.password || ''}
                onChange={(e) => handlePasswordChange(e)}
                error={errors.password}
                touched={touched.password}
                onBlur={() => handleBlur('password')}
            />

            <Typography
                variant="h4"
                sx={{
                    marginTop: '10px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'rgb(66, 87, 108)'
                }}
            >
                Birthdate
            </Typography>

            <DatePicker
                required
                format="YYYY/MM/DD"
                value={data.birthdate}
                error={errors.birthdate}
                onChange={(e) => handleBirthDateChange(e)}
                onBlur={() => handleBlur('birthdate')}
                defaultValue={currentData}
                slotProps={{
                    textField: {
                        required: true,
                        fullWidth: true,
                        sx: {
                            maxWidth: '450px',
                            marginTop: '10px',
                            width: '100%',
                        }
                    }
                }}
            />

            <SignUpBackNext handleNav={handleNav} />
        </Box>
    );
};

export default StepOneSignUp;