import {createContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import {projectApi} from "../axios.js";
import {CircularProgress} from "@mui/material";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(-1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if(Cookies.get('jwt') === undefined || Cookies.get('jwt') === null){
                setIsLoading(false);
                Cookies.remove('jwt');
                Cookies.remove('username');
                return;
            }

            try {
                const token = Cookies.get('jwt');
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await projectApi.post('/auth/verify-token',
                    {
                        token: token,
                        username: Cookies.get('username')
                    },
                    { headers: {
                            Authorization: `Bearer ${token}`
                        }
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    Cookies.remove('jwt');
                    Cookies.remove('username');
                }
            } catch (error) {
                Cookies.remove('jwt');
                Cookies.remove('username');
                console.error('Token verification failed:', error.message || error.toString());
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;