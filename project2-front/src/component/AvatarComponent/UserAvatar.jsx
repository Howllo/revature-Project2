import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";

const UserAvatar = ({ username, image, width = 42, height = 42, border = false }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
  };

  return (
    <Button className="UserAvatarButton" variant="contained" disableRipple={true}
            onClick={(e) => handleSubmit(e)} disableElevation={true}>
      <Avatar className={(image != null && image.includes('s3')) ? "UserAvatarPic" : 'UserAvatarPicNoImg' } alt={name} src={image}
        sx={{
          width: width,
          height: height,
          borderColor: border && 'white',
          borderWidth: border && '3px',
          borderStyle: border && 'solid',
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
  border: PropTypes.bool,
};

export default UserAvatar;
