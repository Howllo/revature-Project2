import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";

const UserAvatar = ({ username, image, width = 48, height = 48 }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate(`/profile/${username}`);
  };

  return (
    <Button className="UserAvatarButton" variant="contained" disableRipple={true}
            onClick={handleSubmit} disableElevation={true}>
      <Avatar alt={name} src={image}
        sx={{
          width: width,
          height: height,
        }}/>
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
