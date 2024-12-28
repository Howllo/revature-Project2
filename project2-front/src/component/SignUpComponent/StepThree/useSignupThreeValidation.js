import {projectApi} from "../../../util/axios.js";
import {useSignup} from "../Context/UseSignup.jsx";
import Cookies from "js-cookie";
import {useAuth} from "../../../util/auth/UseAuth.jsx";
import axios from "axios";

export const useSignupThreeValidation = () => {
    const { data, step, setStep  } = useSignup();
    const { setIsAuthenticated, setUser } =  useAuth();

    const handleNav = async () => {
        const result = await handleSubmitRegister();
        if(result) {
            setStep(step + 1);
        }
    }

    const handleSubmitRegister = async () => {
        if(data.email === "" || data.password === "" || data.username === "" || data.birthdate === ""){
            return false;
        }

        try {
            const response = await projectApi.post("/auth/register",
                {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    birthdate: data.birthdate,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            Cookies.set('jwt', response.data.token, {
                expires: 7,
                sameSite: 'strict',
                secure: true,
            });
            Cookies.set('username', response.data.username, {
                expires: 7,
                sameSite: 'strict',
                secure: true,
            });
            Cookies.set('profile_pic', response.data.profilePicture, {
                expires: 7,
                sameSite: 'strict',
                secure: false,
            });
            Cookies.set('user_id', response.data.userId, {
                expires: 7,
                sameSite: 'strict',
                secure: true,
            })

            if(Cookies.get('user_id')){
                setUser(Cookies.get('user_id'));
            }

            if(Cookies.get('jwt') !== undefined){
                axios.defaults.headers.common['Authorization'] = Cookies.get('jwt');
                setIsAuthenticated(true);
            }
            return response.status === 201 || response.status === 200;
        } catch (error) {
            Cookies.remove('jwt');
            Cookies.remove('username');
            if(error.response && error.response.data.message){
                console.log(`Status Error: ${error.status} - ${error.response.data.message}`);
            } else {
                console.log(`Status Error: ${error.status}`);
            }

            return false;
        }
    }

    const getCaptchaInfo = async () => {
        if(data.captchaToken === "" || data.captchaToken === null || data.captchaToken === undefined){
            return false;
        }

        try{
            const response = await projectApi.post("/auth/verify-captcha",
                {token: data.captchaToken},
                {headers: {
                        'Content-Type': 'application/json',
                    }
                });
            return response.status === 200;
        } catch (e) {
            if(e.response.status === 403 || e.response.status === 500){
                console.log(e.response.status);
            }
            return false;
        }
    }

    return {
        handleNav,
        getCaptchaInfo,
        handleSubmitRegister
    }
};

export default useSignupThreeValidation;