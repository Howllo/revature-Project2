import { Box, Button, List, Typography } from "@mui/material";
import FollowingList from "./FollowingList";
// import { useSettings } from "../Context/useSettings";
import { useNavigate } from "react-router-dom";

const FollowingListContainer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        People Following
      </Typography>
      <Button onClick={handleBack}>Back</Button>
      <List>
        <FollowingList />
        <FollowingList />
      </List>
    </Box>
  );
};
export default FollowingListContainer;
