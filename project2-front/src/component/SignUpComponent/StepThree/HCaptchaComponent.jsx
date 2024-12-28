import { useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Box } from '@mui/material';
import { useSignup } from '../Context/UseSignup.jsx';

// eslint-disable-next-line react/prop-types
const HCaptchaComponent = ({ onVerify, setFailCaptcha, setTouchCaptcha }) => {
    const { data, setData } = useSignup();
    const captchaRef = useRef(null);

    useEffect(() => {
        if (captchaRef.current) {
            captchaRef.current.resetCaptcha();
        }
    }, []);

    const handleVerify = (token) => {
        if (onVerify) {
            onVerify(token);
        }

        if (data) {
            setData({
                ...data,
                captchaToken: token
            });
        }
    };

    const handleExpire = () => {
        if(data){
            setData({
                ...data,
                captchaToken: null
            });
        }
    }

    return (
        <Box
            sx={{
                marginTop: '35px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'left'
            }}
        >
            <HCaptcha
                ref={captchaRef}
                sitekey="d80e5192-471a-4678-b5be-8a22b3445e42"
                onVerify={(token) =>{
                    handleVerify(token)
                    setFailCaptcha(false)
                    setTouchCaptcha(false)
                }}
                onExpire={() => {
                    handleExpire()
                    setTouchCaptcha(true)
                    setFailCaptcha(true)
                }}
                onError={() => {
                    setFailCaptcha(true)
                    setTouchCaptcha(true)
                }}
                theme="light"
                size="normal"
            />
        </Box>
    );
};

export default HCaptchaComponent;