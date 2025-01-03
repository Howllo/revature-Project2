import {createContext, useState} from "react";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { projectApi } from "../../../util/axios";

const NavContext = createContext(null);

export const NavProvider = ({children}) => {
    const [currentNav, setCurrentNav] = useState('home');

    const getUser = async () => {
        const token = Cookies.get('jwt');    
        try {
                const response  = await projectApi.get(`/user/${Cookies.get('user_id')}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const returning = response.data
                return returning;
            } catch (e) {
                console.error('Error getting current user: ', e.status);
            }
        }

    const value = {
        currentNav,
        setCurrentNav,
        getUser
    }

    return (
        <NavContext.Provider value={value}>
            {children}
        </NavContext.Provider>
    )
}

NavProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NavContext;