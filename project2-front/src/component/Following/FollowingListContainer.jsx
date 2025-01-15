import { Box, Button, List, Typography } from "@mui/material";
import FollowingList from "./FollowingList";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FollowingListContext from "./Context/FollowingListProvider";

const FollowingListContainer = () => {
  const navigate = useNavigate();
  const { followingList } = useContext(FollowingListContext);

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 1,
        borderRadius: 2,
        bgcolor: "background.paper", // Uses theme's background color
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        People You Are Following
      </Typography>
      <Button
        variant="outlined"
        sx={{ mb: 3, textTransform: "none" }}
        onClick={handleBack}
      >
        Back
      </Button>
      <List>
        {followingList &&
          followingList.map((following) => {
            return (
              <FollowingList following={following} key={following.username} />
            );
          })}
      </List>
    </Box>
  );
};
export default FollowingListContainer;
