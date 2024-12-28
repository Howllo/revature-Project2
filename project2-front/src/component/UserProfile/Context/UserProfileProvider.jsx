import { createContext, useState } from 'react';
import PropTypes from "prop-types";
import {projectApi} from "../../../util/axios.js";

const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
    const [listPostData, setListPostData] = useState([]);
    const [following, setFollowing] = useState()

    const setFollow = async (follower_id, following_id) => {
        try {
            const response = await projectApi.post(`/${follower_id}/follow/${following_id}`)
            return response.status === 200;
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