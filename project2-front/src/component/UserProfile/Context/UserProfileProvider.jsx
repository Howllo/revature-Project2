import { createContext, useState } from 'react';
import PropTypes from "prop-types";
import {projectApi} from "../../../util/axios.js";
import Cookies from 'js-cookie';

const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
    const [listPostData, setListPostData] = useState([]);
    const [following, setFollowing] = useState()

    const setFollow = async (follower_id, username) => {
        try {
            const response = await projectApi.post(`/user/${follower_id}/follow/${username}`)
            return response.status === 200;
        } catch (e) {
            console.error(`Error Status: ${e.status}`);

            throw e;
        }
    }

    const removeFollow = async (follower_id, username) => {
        try {
            const response = await projectApi.delete(`/user/${follower_id}/follow/${username}`)
            return response.status === 200;
        } catch (e) {
            console.error(`Error Status: ${e.status}`);

            throw e;
        }
    }

    const checkFollow = async (follower_id, following_username) => {
        console.log(follower_id)
        console.log(following_username)
        try {
            const response = await projectApi.get(`/user/${follower_id}/follow/${following_username}`)
            const respData = response.data
           
            return respData
        } catch (e) {
            console.error(`Error Status: ${e.status}`);

            throw e;
        }
    }

    const value = {
        listPostData,
        setListPostData,
        following,
        setFollowing,
        setFollow,
        checkFollow,
        removeFollow
    };

    return (
        <UserProfileContext.Provider value={value}>
            {children}
        </UserProfileContext.Provider>
    );
};

UserProfileProvider.propTypes = {
    children: PropTypes.node,
};


export default UserProfileContext;