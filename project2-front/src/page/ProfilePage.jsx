import { Box } from "@mui/material";
import UserDisplay from "../component/UserProfile/UserDisplay.jsx";
import ProfileButton from "../component/UserProfile/ProfileButton.jsx";
import ProfileInformationPanel from "../component/UserProfile/ProfileInformationPanel.jsx";
import ProfileBiography from "../component/UserProfile/ProfileBiography.jsx";
import ProfilePost from "../component/UserProfile/ProfilePost.jsx";
import { useEffect, useState } from "react";
import { UserProfileProvider } from "../component/UserProfile/Context/UserProfileProvider.jsx";
import { useLocation } from "react-router-dom";
import SettingsContainer from "../component/ProfileSettings/SettingsContainer.jsx";

const ProfilePage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (location.state?.userObj) {
      setUserData(location.state?.userObj);
    } else {
      setUserData(null);
    }
  }, [location]);

  return (
    <UserProfileProvider>
      <Box
        sx={{
          maxWidth: "85%",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {/* User Profile Information */}
        <Box>
          {userData && <UserDisplay user={userData} />}
          <div style={{mt: '-1px',
                    borderRadius: '0px',
                    marginTop: '-38px',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgb(212, 219, 226)',
                    width: '99.7%',
                    paddingTop: '20px'}} >
          {userData && <ProfileButton user={userData} />}
          {userData && <ProfileInformationPanel user={userData} />}
          {userData && <SettingsContainer user={userData} />}
          {userData && <ProfileBiography user={userData} />}
          </div>
        </Box>

        {/* User Post */}
        <Box sx={{mt: '-1px',
                    borderRadius: '0px',
                    marginTop: '-1px',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgb(212, 219, 226)',
                    width: '99.7%',}}>{userData && <ProfilePost user={userData} />}</Box>
      </Box>
    </UserProfileProvider>
  );
};

export default ProfilePage;
