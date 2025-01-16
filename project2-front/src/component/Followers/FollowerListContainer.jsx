import { Box, Button, List, Typography } from "@mui/material";
import FollowerList from "./FollowerList";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FollowerListContext from "./Context/FollowerListProvider";

const FollowerListContainer = () => {
  const navigate = useNavigate();
  const { followerList } = useContext(FollowerListContext);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        Followers
      </Typography>
      <Button onClick={handleBack}>Back</Button>
      <List>
        {followerList &&
          followerList.map((follower) => (
            <FollowerList follower={follower} key={follower.username} />
          ))}
      </List>
    </Box>
  );
};
export default FollowerListContainer;
