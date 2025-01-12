import { Box } from "@mui/material";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";
import { useUserProfile } from "./Context/UseUserProfile.jsx";
<<<<<<< HEAD
=======
import PropTypes from "prop-types";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
import { useEffect, useState } from "react";

const UserDisplay = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const { getUserData } = useUserProfile();
<<<<<<< HEAD

  useEffect(() => {
    const y = getUserData(user.username);
    y.then((value) => {
      setUserData(value);
    });
  });
=======
    

    useEffect(() => {
        const y = getUserData(user.username)
        y.then(value =>{
            setUserData(value)
        })
    });
  
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
  return (
    <Box>
      <Box>
        <img
          src={userData.bannerPic || "https://picsum.photos/1500/500"}
          alt="Post Image"
          loading={"lazy"}
          style={{
            marginTop: "10px",
            width: "100%",
            height: "100%",
            borderRadius: "0px",
            maxWidth: "546px",
            maxHeight: "180px",
            minWidth: "546px",
            minHeight: "180px",
          }}
        />
        <Box
          sx={{
            mt: "-76px",
            ml: "-30px",
          }}
        >
          <UserAvatar
            username={user.username}
            image={userData.profilePic}
<<<<<<< HEAD
            width={64}
            height={64}
=======
            width={92}
            height={92}
>>>>>>> d10b0f0b465ce22f85f15232f43bc3b0e10e2010
          />
        </Box>
      </Box>
    </Box>
  );
};

UserDisplay.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserDisplay;
