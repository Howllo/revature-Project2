import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HorizontalRule } from "@mui/icons-material";
import SelectLanguage from "../../LanguageChoose/SelectLanguage.jsx";
import { useSignup } from "../Context/UseSignup.jsx";
import { useEffect, useState } from "react";
import useSignupThreeValidation from "../StepThree/useSignupThreeValidation.js";
import PropTypes from 'prop-types';

export function SignUpBackNext({ handleNav, captchaSecurity }) {
    const { step, setStep, data } = useSignup();
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();
    const { getCaptchaInfo } = useSignupThreeValidation();

    const handleBack = (e) => {
        e.preventDefault();

        if (step > 0) {
            setStep(step - 1);
            return;
        }

        if (step === 0) {
            navigate('/');
        }
    }

    useEffect(() => {
        if (captchaSecurity === undefined) {
                setShowButton(true);
            }
    }, [step, captchaSecurity]);

    useEffect(() => {
        if (step === 3 && data.captchaToken !== '') {
            const checkCaptcha = async () => {
                const result = await getCaptchaInfo();
                setShowButton(result);
            }
            checkCaptcha();
        }

        if (step === 3 && data.captchaToken === '') {
            setShowButton(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.captchaToken]);

    return (
        <Box>
            <Box
                sx={{
                    maxWidth: '450px',
                    marginTop: '40px',
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

                {showButton && (
                    <Button
                        variant="contained"
                        onClick={handleNav}
                        sx={{
                            backgroundColor: 'rgb(56,155,253)',
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                        }}
                    >
                        Next
                    </Button>
                )}
            </Box>

            <Box
                sx={{
                    marginTop: '10px',
                    maxWidth: '450px',
                }}
            >
                <HorizontalRule
                    sx={{
                        color: 'rgb(212,217,225)',
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'rgb(212,217,225)',
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '3px',
                }}
            >
                <SelectLanguage />

                <Box
                    sx={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        fontFamily="Arial"
                        sx={{
                            marginLeft: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            maxWidth: '100px',
                            color: 'rgb(66, 87, 108)'
                        }}
                    >
                        Having Trouble?
                    </Typography>
                    <Link to={'/'}>
                        <Typography
                            variant="h4"
                            fontFamily="Arial"
                            sx={{
                                marginLeft: '4px',
                                fontSize: '12px',
                                fontWeight: 600,
                                maxWidth: '100px',
                                color: 'rgb(25, 118, 210)'
                            }}
                        >
                            Contact support
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

SignUpBackNext.propTypes = {
    handleNav: PropTypes.func.isRequired,
    captchaSecurity: PropTypes.bool,
};

export default SignUpBackNext;