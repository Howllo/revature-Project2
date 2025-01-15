import FollowingListContainer from "../component/Following/FollowingListContainer";
import { FollowingListProvider } from "../component/Following/Context/FollowingListProvider";

const FollowingPage = () => {
  return (
    <FollowingListProvider>
      <FollowingListContainer />
    </FollowingListProvider>
  );
};

export default FollowingPage;
