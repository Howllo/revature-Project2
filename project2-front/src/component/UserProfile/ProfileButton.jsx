import { Box, Button } from "@mui/material";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProfileButton = ({ user }) => {
  const { setFollow, checkFollow, removeFollow, handleOpenDialogBox } =
    useUserProfile();
  const [isFollowed, setIsFollowed] = useState();

  useEffect(() => {
    const x = checkFollow(Cookies.get("user_id"), user.username);
    x.then((value) => {
      setIsFollowed(value);
    });
  }, [user]);

  const handleFollow = async () => {
    isFollowed
      ? removeFollow(Cookies.get("user_id"), user.username)
      : setFollow(Cookies.get("user_id"), user.username);
    setIsFollowed(!isFollowed);
  };

  if (Cookies.get("username") === user.username) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderColor: "gray",
          borderWidth: "1px",
          mt: "-20px",
          paddingRight: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            flexGrow: 1,
          }}
        >
          <Button
            onClick={handleOpenDialogBox}
            variant="contained"
            size="small"
            disableElevation={true}
            sx={{
                color: "rgb(65,86,119)",
                borderRadius: '20px',
                textTransform: "capitalize",
                mt: "5px",
                backgroundColor: "rgb(239,241,243)",
          }}>
            Edit Profile
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderColor: "gray",
        borderWidth: "1px",
        mt: "-20px",
        paddingRight: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <Button
          onClick={handleFollow}
          variant="contained"
          size="small"
          sx={{
            borderRadius: 6,
            textTransform: "capitalize",
            mt: "5px"
          }}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
};

ProfileButton.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfileButton;
