import {createContext, useState} from "react";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { projectApi } from "../../../util/axios";

const GetSelectedData = createContext(null);

export const SearchProvider = ({children}) => {

    const getUser = async (userId) => {
        const token = Cookies.get('jwt');    
        try {
                const response  = await projectApi.get(`/user/${userId}`, {
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
        getUser
    }

    return (
        <GetSelectedData.Provider value={value}>
            {children}
        </GetSelectedData.Provider>
    )
}

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GetSelectedData;