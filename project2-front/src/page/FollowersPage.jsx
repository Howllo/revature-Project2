import FollowerListContainer from "../component/Followers/FollowerListContainer";
import { FollowerListProvider } from "../component/Followers/Context/FollowerListProvider";

const FollowersPage = () => {
  return (
    <FollowerListProvider>
      <FollowerListContainer />
    </FollowerListProvider>
  );
};

export default FollowersPage;
