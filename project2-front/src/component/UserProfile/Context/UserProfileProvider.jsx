﻿import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { projectApi } from "../../../util/axios.js";
import Cookies from "js-cookie";
import { SettingsProvider } from "../../ProfileSettings/Context/SettingsProvider.jsx";

const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
  const [listPostData, setListPostData] = useState([]);
  const [following, setFollowing] = useState();
  const [isOpenDialogBox, setIsOpenDialogBox] = useState(false);

  const handleOpenDialogBox = () => {
    setIsOpenDialogBox(true);
  };
  const handleCloseDialogBox = () => {
    setIsOpenDialogBox(false);
  };

  const setFollow = async (follower_id, username) => {
    const token = Cookies.get("jwt");
    try {
      const response = await projectApi.post(
        `/user/${follower_id}/follow/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.status === 200;
    } catch (e) {
      console.error(`Error Status: ${e.status}`);
      throw e;
    }
  };
  const removeFollow = async (currentUser, username) => {
    const token = Cookies.get("jwt");
    try {
      const response = await projectApi.delete(
        `/user/${currentUser}/follow/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.status === 200;
    } catch (e) {
      console.error(`Error Status: ${e.status}`);

      throw e;
    }
  };

  const checkFollow = async (follower_id, following_username) => {
    try {
      const response = await projectApi.get(
        `/user/${follower_id}/follow/${following_username}`
      );
      const respData = response.data;

      return respData;
    } catch (e) {
      console.error(`Error Status: ${e.status}`);

      throw e;
    }
  };

  const getId = async (username) => {
    try {
      const response = await projectApi.get(`/user/getSearchDto/${username}`);
      const respData = response.data;

      return respData.id;
    } catch (e) {
      console.error(`Error Status: ${e.status}`);

      throw e;
    }
  };

  const getUserData = async (username) => {
    try {
      const response = await projectApi.get(`/user/username/${username}`);
      return response.data;
    } catch (e) {
      console.error(`Error Status: ${e.status}`);

      throw e;
    }
  };

  const value = {
    listPostData,
    setListPostData,
    following,
    setFollowing,
    setFollow,
    checkFollow,
    removeFollow,
    handleOpenDialogBox,
    handleCloseDialogBox,
    isOpenDialogBox,
    getId,
    getUserData,
  };

  return (
    <UserProfileContext.Provider value={value}>
      <SettingsProvider>{children}</SettingsProvider>
    </UserProfileContext.Provider>
  );
};

UserProfileProvider.propTypes = {
  children: PropTypes.node,
};
export default UserProfileContext;
