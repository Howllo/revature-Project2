import FollowerListContainer from "../component/Followers/FollowerListContainer";
import { FollowerListProvider } from "../component/Followers/Context/FollowerListProvider";
import { UserProfileProvider } from "../component/UserProfile/Context/UserProfileProvider";

const FollowersPage = () => {
  return (
    <UserProfileProvider>
      <FollowerListProvider>
        <FollowerListContainer />
      </FollowerListProvider>
    </UserProfileProvider>
  );
};

export default FollowersPage;
