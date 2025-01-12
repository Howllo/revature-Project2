import { Box, Typography } from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import {useEffect, useState} from "react";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PropTypes from "prop-types";

const ProfileInformationPanel = ({ user }) => {
  const { listPostData, getUserPost } = usePost();
  const { getId, settingsData } = useUserProfile();
    const [time, setTime] = useState(null);

  useEffect(() => {
      const options = { year: "numeric", month: "long" };
      const date = new Date(user.joinDate);
      const formattedDate = date.toLocaleDateString("en-US", options);
      setTime(formattedDate);

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
          fontWeight: "600",
          fontSize: "35px",
          color: "black",
          mt: "-15px",
          paddingLeft: "10px",
          paddingTop: "15px",
        }}
      >
        {settingsData.displayName || user.username}
      </Typography>

      <Typography
        variant="h6"
        color="secondary"
        sx={{
            fontWeight: "600",
            fontSize: "17px",
            mt: "-5px",
            color: "rgb(66, 87, 108)",
            paddingLeft: "10px",
        }}
      >
        @{user.username}
      </Typography>

      <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: '3px'
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
              fontWeight: "800",
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
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
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(66, 87, 108)",
            }}
          >
            followers
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
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
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
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(66, 87, 108)",
            }}
          >
            following
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
              fontSize: "15px",
              color: "rgb(11, 15, 20)",
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
              fontWeight: "400",
              fontSize: "15px",
              color: "rgb(66, 87, 108)",
            }}
          >
            posts
          </Typography>
        </Box>
      </Box>

        <Typography
            variant="h6"
            color="secondary"
            sx={{
                marginTop: "8px",
                fontWeight: "400",
                fontSize: "15px",
                color: "rgb(66, 87, 108)",
                paddingLeft: "10px",
                flexDirection: 'row',
                paddingBottom: "1px",
            }}
        >
            <CalendarMonthIcon sx={{
                width: '16px',
                height: '16px',
                paddingTop: '1px',
            }}/>
            Joined {time}
        </Typography>
    </Box>
  );
};
ProfileInformationPanel.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        followingCount: PropTypes.number.isRequired,
        followerCount: PropTypes.bool.isRequired,
        joinDate: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfileInformationPanel;
