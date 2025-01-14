import { createContext } from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { projectApi } from "../../../util/axios";
import PropTypes from "prop-types";

const FollowerListContext = createContext(null);

export const FollowerListProvider = ({ children }) => {
  const [followerList, setFollowerList] = useState([]);

  const handleDeleteFollower = async (currentUser, username) => {
    try {
      const response = await projectApi.delete(
        `/user/${username}/follow/${currentUser}`
      );

      if (response.status !== 200) {
        throw new Error("API call was not successful");
      }
      setFollowerList((prev) => {
        prev.filter((follower) => follower.username !== username);
      });
    } catch (e) {
      throw new Error("Couldn't delete user" + e);
    }
  };

  const handleGetFollowers = async () => {
    try {
      const user_id = Cookies.get("user_id");
      const response = await projectApi.get(`/user/followers/${user_id}`);
      if (response.status !== 200) {
        throw new Error("API response was not okay");
      }
      setFollowerList(response.data);
    } catch (e) {
      console.error(`Error Status: ${e.status}`);
      throw e;
    }
  };

  useEffect(() => {
    handleGetFollowers();
  }, []);

  return (
    <FollowerListContext.Provider
      value={{
        followerList,
        setFollowerList,
        handleDeleteFollower,
        handleGetFollowers,
      }}
    >
      {children}
    </FollowerListContext.Provider>
  );
};

FollowerListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FollowerListContext;
