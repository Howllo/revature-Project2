import { createContext } from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { projectApi } from "../../../util/axios";

const FollowingListContext = createContext(null);

export const FollowingListProvider = ({ children }) => {
  const [followingList, setFollowingList] = useState([]);

  const handleDeleteFollowing = async (currentUsername, username) => {
    try {
      const response = await projectApi.delete(
        `/user/${currentUsername}/follow/${username}`
      );

      if (response.status !== 200) {
        throw new Error("API call was not successful");
      }
      console.log(response.data);
      setFollowingList((prev) => {
        return prev.filter((following) => following.username !== username);
      });
    } catch (e) {
      throw new Error("Couldn't delete user" + e);
    }
  };

  const handleGetFollowing = async () => {
    try {
      const user_id = Cookies.get("user_id");
      const response = await projectApi.get(`/user/following/${user_id}`);
      if (response.status !== 200) {
        throw new Error("API response was not okay");
      }
      setFollowingList(response.data);
    } catch (e) {
      console.error(`Error Status: ${e.status}`);
      throw e;
    }
  };

  useEffect(() => {
    handleGetFollowing();
  }, [followingList]);

  return (
    <FollowingListContext.Provider
      value={{
        followingList,
        setFollowingList,
        handleDeleteFollowing,
        handleGetFollowing,
      }}
    >
      {children}
    </FollowingListContext.Provider>
  );
};
export default FollowingListContext;
