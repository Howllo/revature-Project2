import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { projectApi } from "../../util/axios.js";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";

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
    console.log(userData.username.toLowerCase());
    console.log(userData);
    if (userData) {
      navigate(`/profile/${userData.username.toLowerCase()}`, {
        state: { userObj: userData },
      });
    }
  };

  return (
    <Button className="UserAvatarButton" variant="contained" disableRipple={true}
            onClick={handleSubmit} disableElevation={true}>
      <Avatar className="UserAvatarPic" alt={name} src={image}/>
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
