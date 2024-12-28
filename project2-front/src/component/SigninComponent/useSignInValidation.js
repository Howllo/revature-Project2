import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {projectApi} from "../../util/axios.js";
import useAuth from "../../util/auth/UseAuth.jsx";
import useSignIn from "./Context/UseSignin.jsx";

export const useSignInValidation = () => {
    let navigate  = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();
    const { setCredentialsInvalid } = useSignIn();

    const setCookieOnBadRequest = () => {
        setIsAuthenticated(false);
        Cookies.remove('jwt');
        Cookies.remove('username');
    }

    const handleSubmit = async (email, password) => {
        const result = await validateAll(email, password);
        if(result) {
            navigate('/');
        }
    }

    const handleBack = () => {
        navigate('/');
    }

    const validateAll = async (email, password) => {
        if(email === "" || password === ""){
            console.log(`Email: ${email} - Password: ${password}`);
            return false;
        }

        try{
            const response = await projectApi.post("/auth/login",
                {
                    email: email,
                    username: Cookies.get('username'),
                    password: password,
                    birthdate: null
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if(response.status !== 200) {
                console.log(`Status Error: ${response.status} - ${response.data.message}`);
                setCookieOnBadRequest();
                setCredentialsInvalid(true);
                return false;
            }

            if(Cookies.get('jwt') !== undefined){
                axios.defaults.headers.common['Authorization'] = Cookies.get('jwt');
                setIsAuthenticated(true);

            } else {
                Cookies.set('jwt', response.data.token, {
                    expires: 7,
                    sameSite: 'strict',
                    secure: true,
                });
                axios.defaults.headers.common['Authorization'] = Cookies.get('jwt');
                setIsAuthenticated(true);
            }

            Cookies.set('username', response.data.username, {
                expires: 7,
                sameSite: 'strict',
                secure: true,
            });
            Cookies.set('displayName', response.data.displayName, {
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

            return response.status === 200;
        } catch (e) {
            console.log(`Status Error: ${e.response.status}`);
            setIsAuthenticated(false);
            setCredentialsInvalid(true);
            setCookieOnBadRequest();
            return false;
        }
    }

    return {
        handleBack,
        handleSubmit
    }
}