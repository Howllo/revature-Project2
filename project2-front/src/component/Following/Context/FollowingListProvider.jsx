import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const FollowingListContext = createContext(null);

export const FollowingListProvider = ({ children }) => {
  const [followingList, setFollowingList] = useState([]);

  const handleDeleteFollowing = async (follower_id, username) => {
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

  useEffect(() => {
    try {
      const fetchFollowingList = async () => {
        const user_id = Cookies.get("user_id");
        const response = await axios.get(`/user/following/${user_id}`);

        if (response.status !== 200) {
          throw new Error("API response was not okay");
        }

        setFollowingList(response.data);
      };

      fetchFollowingList();
    } catch (e) {
      console.error(`Error Status: ${e.status}`);
      throw e;
    }
  }, []);

  return (
    <FollowingListContext.Provider
      value={{ followingList, setFollowingList, handleDeleteFollowing }}
    >
      {children}
    </FollowingListContext.Provider>
  );
};
export default FollowingListContext;
