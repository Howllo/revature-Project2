import FollowingListContainer from "../component/Following/FollowingListContainer";
import { FollowingListProvider } from "../component/Following/Context/FollowingListProvider";
import { UserProfileProvider } from "../component/UserProfile/Context/UserProfileProvider";

const FollowingPage = () => {
  return (
    <UserProfileProvider>
      <FollowingListProvider>
        <FollowingListContainer />
      </FollowingListProvider>
    </UserProfileProvider>
  );
};

export default FollowingPage;
