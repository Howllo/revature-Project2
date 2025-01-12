import { Box, Button, List, Typography } from "@mui/material";
import FollowerList from "./FollowerList";
// import { useSettings } from "../Context/useSettings";
import { useNavigate } from "react-router-dom";

const FollowerListContainer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Followers
      </Typography>
      <Button onClick={handleBack}>Back</Button>
      <List>
        <FollowerList />
        <FollowerList />
      </List>
    </Box>
  );
};
export default FollowerListContainer;
