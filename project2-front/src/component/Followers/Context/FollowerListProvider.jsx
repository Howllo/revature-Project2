import { createContext } from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { projectApi } from "../../../util/axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const FollowerListContext = createContext(null);

export const FollowerListProvider = ({ children }) => {
  const [followerList, setFollowerList] = useState([]);
  const { username } = useParams();

  const handleDeleteFollower = async (currentUser, username) => {
    try {
      const { status } = await projectApi.delete(
        `/user/${currentUser}/follow/${username}`
      );

      if (status !== 200) {
        throw new Error("Failed to delete the follower");
      }

      setFollowerList((prev) =>
        prev.filter((follower) => follower.username !== username)
      );
    } catch (error) {
      console.error("Error deleting the follower:", error.message);
      throw new Error(`Couldn't delete user: ${error.message}`);
    }
  };

  const handleGetFollowers = async () => {
    try {
      const response = await projectApi.get(`/user/followers/${username}`);
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
  }, [username]);

  return (
    <FollowerListContext.Provider
      value={{
        followerList,
        setFollowerList,
        handleDeleteFollower,
        handleGetFollowers,
        username
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
