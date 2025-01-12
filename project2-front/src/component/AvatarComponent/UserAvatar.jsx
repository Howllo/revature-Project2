import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { projectApi } from "../../util/axios.js";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({ username, image, width = 42, height = 42 }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await projectApi.get(`/user/username/${username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserData(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // We don't have a global logging system.
    }
  };

  const handleSubmit = async () => {
    await getUserData();
    if (userData) {
      navigate(`/profile/${userData.username.toLowerCase()}`, {
        state: { userObj: userData },
      });
    }
  };

  return (
    <Button
      variant="contained"
      disableRipple={true}
      onClick={handleSubmit}
      disableElevation={true}
      sx={{
        borderRadius: "30px",
        width: "30%",
        backgroundColor: "transparent",
      }}
    >
      <Avatar
        alt={name}
        src={image}
        sx={{
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: "2px",
          width: { width },
          height: { height },
        }}
      />
    </Button>
  );
};

UserAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default UserAvatar;
