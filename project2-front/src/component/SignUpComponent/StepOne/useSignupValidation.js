import { useState, useEffect } from 'react';
import { RequirementsEmail, RequirementsPassword } from '../../../util/RequirementsAccount.js';
import {projectApi} from "../../../util/axios.js";
import {useSignup} from "../Context/UseSignup.jsx";

export const useSignupValidation = (formData) => {
    const { data } = useSignup();

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });
    const [errorStatus, setErrorStatus] = useState('');

    useEffect(() => {
        if (touched.email) {
            setErrors(prev => ({
                ...prev,
                email: RequirementsEmail(formData.email)
            }));
        }
        if (touched.password) {
            setErrors(prev => ({
                ...prev,
                password: RequirementsPassword(formData.password)
            }));
        }
    }, [formData, touched]);

    const handleBlur = (field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const validateAll = async () => {
        const allTouched = {
            email: true,
            password: true,
        };
        setTouched(allTouched);

        const validEmail = RequirementsEmail(formData.email);
        const validPassword = RequirementsPassword(formData.password);
        const isEmailAllowed = await checkEmail();

        if (!validEmail || !isEmailAllowed ) {
            setErrorStatus('EMAIL');
        } else if (!validPassword) {
            setErrorStatus('PASSWORD');
        } else if (!formData.birthdate) {
            setErrorStatus('BIRTHDATE');
        } else {
            setErrorStatus('');
        }

        return validEmail && validPassword && formData.birthdate;
    };

    const checkEmail = async () => {
        let inEmail = data.email;
        if(inEmail.length <= 4){
            return false;
        }
        try{
            const response = await projectApi.post(`/user/check/email`,
                { email: inEmail },
                { headers: {
                        'Content-Type': 'application/json',
                    }
                });
            return response.status === 200;
        } catch (e) {
            if(e.response.status === 403 || e.response.status === 500) {
                console.log(`Status Error: ${e.response.status}`);
            }
            return false;
        }
    }

    return {
        errors,
        touched,
        errorStatus,
        handleBlur,
        validateAll,
    };
};

export default useSignupValidation;