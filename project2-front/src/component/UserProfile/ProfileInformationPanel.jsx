import { Box, Typography } from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import { useEffect } from "react";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileInformationPanel = ({ user }) => {
  const { listPostData, getUserPost } = usePost();
  const { getId, settingsData } = useUserProfile();
  useEffect(() => {
    const x = getId(user.username);
    x.then((value) => {
      getUserPost(value);
    });
  }, [user]);

  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: "600",
          fontSize: "34px",
          color: "black",
          mt: "-15px",
          paddingLeft: "10px",
          paddingTop: "15px",
        }}
      >
        {/* {settingsData.displayName || user.username} */}
        {user.username}
      </Typography>

      <Typography
        variant="h6"
        color="secondary"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: "300",
          fontSize: "13px",
          color: "rgb(66, 87, 108)",
          paddingLeft: "10px",
        }}
      >
        @{user.username}
      </Typography>

      <Typography
        variant="h6"
        color="secondary"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: "300",
          fontSize: "13px",
          color: "rgb(66, 87, 108)",
          paddingLeft: "10px",
        }}
      >
        Join Date: {user.joinDate.split("T")[0]}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "800",
              fontSize: "13px",
              color: "rgb(66, 87, 108)",
              paddingLeft: "10px",
            }}
          >
            {user.followerCount}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "300",
              fontSize: "13px",
              color: "rgb(66, 87, 108)",
            }}
          >
            <Link to="/followers">followers</Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              marginLeft: "10px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "800",
              fontSize: "13px",
              color: "rgb(66, 87, 108)",
            }}
          >
            {user.followingCount}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "300",
              fontSize: "13px",
              color: "rgb(66, 87, 108)",
            }}
          >
            <Link to="/following">following</Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              marginLeft: "10px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "800",
              fontSize: "13px",
              color: "rgb(66, 87, 108)",
            }}
          >
            {listPostData.length}
          </Typography>

          <Typography
            variant="h6"
            color="secondary"
            sx={{
              marginLeft: "5px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "300",
              fontSize: "13px",
              color: "rgb(66, 87, 108)",
            }}
          >
            posts
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
ProfileInformationPanel.prototype = {
  user: PropTypes.node.isRequired,
  username: PropTypes.string.isRequired,
};

export default ProfileInformationPanel;
