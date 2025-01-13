import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";

const UserAvatar = ({ username, image, width = 42, height = 42 }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate(`/profile/${username}`);
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
