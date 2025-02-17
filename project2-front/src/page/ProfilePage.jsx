﻿import { Box } from "@mui/material";
import UserDisplay from "../component/UserProfile/UserDisplay.jsx";
import ProfileButton from "../component/UserProfile/ProfileButton.jsx";
import ProfileInformationPanel from "../component/UserProfile/ProfileInformationPanel.jsx";
import ProfileBiography from "../component/UserProfile/ProfileBiography.jsx";
import ProfilePost from "../component/UserProfile/ProfilePost.jsx";
import { useEffect, useState } from "react";
import { UserProfileProvider } from "../component/UserProfile/Context/UserProfileProvider.jsx";
import { useLocation, useParams } from "react-router-dom";
import SettingsContainer from "../component/ProfileSettings/SettingsContainer.jsx";
import { projectApi } from "../util/axios.js";
import "./ProfilePage.css";
import { FollowerListProvider } from "../component/Followers/Context/FollowerListProvider.jsx";
import {usePost} from "../component/Post/Context/UsePost.jsx";
import NoPostHereComponent from "../component/UserProfile/NoPostHereComponent.jsx";
import {HorizontalRule} from "@mui/icons-material";
import {useAuth} from "../util/auth/UseAuth.jsx";

const ProfilePage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const { username } = useParams();
  const [key, setKey] = useState(0);
  const { listPostData } = usePost();
  const { isAuthenticated } = useAuth();

  const getUser = async (user) => {
    try {
      const response = await projectApi.get(`/user/username/${user}`);
      return response.data;
    } catch (e) {
      console.error(`Error Status: ${e.status}`);
      throw e;
    }
  };

  const handleButtonDisplay = () => {
    if (isAuthenticated) {
        return <ProfileButton update={() => setKey(key + 1)} user={userData} />
    } else {
        return <br/>
    }
}

  useEffect(() => {
    if (location.state?.userObj) {
      setUserData(location.state?.userObj);
    } else {
      const x = getUser(username);
      x.then((value) => {
        setUserData(value);
      });
    }
  }, [location, username]);

  useEffect(() => {
    if(userData){
      document.title = `${userData.displayName || ''} (@${username}) - DevSky`
    }
  }, [userData, username]);

  return (
    <FollowerListProvider>
      <UserProfileProvider>
        <Box
          className="ProfilePageFullContainer"
          sx={{ flexDirection: "column" }}
        >
          {/* User Profile Information */}
          <Box>
            {userData && <UserDisplay user={userData} />}
            <Box
              className="ProfilePageUserContainer"
              sx={{
                mt: "-1px",
                borderRadius: "0px",
                marginTop: "-38px",
                marginBottom: "3%",
                width: "99.7%",
                paddingTop: "20px",
              }}
            >
              {userData && (
                handleButtonDisplay()
              )}
              {userData && (
                <ProfileInformationPanel key={key} user={userData} />
              )}
              {userData && <SettingsContainer user={userData} />}
              {userData && <ProfileBiography user={userData} />}

              {listPostData && listPostData.length === 0 &&
                <HorizontalRule sx={{
                  mt: '-5px',
                  color: 'rgb(212,217,225)',
                  width: '103.7%',
                  height: '1px',
                  backgroundColor: 'rgb(212,217,225)',
                }}/>
              }
            </Box>
          </Box>

          {/* User Post */}
          <Box className="ProfilePageProfilePostContainer">
            {userData && <ProfilePost user={userData} />}
          </Box>

          {/* No Post Yet */}
          <Box>
            {listPostData && listPostData.length === 0 && <NoPostHereComponent/>}
          </Box>
        </Box>
      </UserProfileProvider>
    </FollowerListProvider>
  );
};

export default ProfilePage;
