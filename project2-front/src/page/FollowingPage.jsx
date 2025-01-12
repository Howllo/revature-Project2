import FollowingListContainer from "../component/Following/FollowingListContainer";

import { FollowingListProvider } from "../component/Following/Context/FollowingListProvider";
const FollowersPage = () => {
  return (
    <FollowingListProvider>
      <FollowingListContainer />;
    </FollowingListProvider>
  );
};

export default FollowersPage;
