import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const FollowerListContext = createContext(null);

export const FollowerListProvider = ({ children }) => {
  const [followerList, setFollowerList] = useState([]);

  const handleDeleteFollower = async (follower_id, username) => {
    try {
      const response = await axios.delete(
        `/user/${follower_id}/follow/${username}`
      );

      if (response.status !== 200) {
        throw new Error("API call was not successful");
      }
    } catch (e) {
      throw new Error("Couldn't delete user" + e);
    }
  };

  const handleGetFollowers = async () => {
    try {
      const user_id = Cookies.get("user_id");
      const response = await axios.get(`/user/followers/${user_id}`);
      if (response.status !== 200) {
        throw new Error("API response was not okay");
      }
      setFollowerList(response.data);
    } catch (e) {
      console.error(`Error Status: ${e.status}`);
      throw e;
    }
  };

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
export default FollowerListContext;
