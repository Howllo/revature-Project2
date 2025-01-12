﻿import {Box} from "@mui/material";
import UserDisplay from "../component/UserProfile/UserDisplay.jsx";
import ProfileButton from "../component/UserProfile/ProfileButton.jsx";
import ProfileInformationPanel from "../component/UserProfile/ProfileInformationPanel.jsx";
import ProfileBiography from "../component/UserProfile/ProfileBiography.jsx";
import ProfilePost from "../component/UserProfile/ProfilePost.jsx";
import {useEffect, useState} from "react";
import {UserProfileProvider} from "../component/UserProfile/Context/UserProfileProvider.jsx";
import {useLocation, useParams} from "react-router-dom";
import SettingsContainer from "../component/ProfileSettings/SettingsContainer.jsx";
import {projectApi} from "../util/axios.js";

const ProfilePage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const {username} = useParams(); 
  const [key, setKey] = useState(0)

  const getUser = async (user) => {
    try {
          const response = await projectApi.get(`/user/username/${user}`);
          return response.data;
        } catch (e) {
          console.error(`Error Status: ${e.status}`);
          throw e;
        }
  }

  useEffect(() => {
    if (location.state?.userObj) {
      setUserData(location.state?.userObj);
    } else {
      const x = getUser(username);
      x.then(value => {
        setUserData(value);
      })
    }
  }, [location, username]);

  return (
    <UserProfileProvider>
      <Box
        sx={{
          maxWidth: "85%",
          width: "100%",
          flexDirection: "column",
            mt: '-10px'
        }}
      >
        {/* User Profile Information */}
        <Box>
          {userData && <UserDisplay user={userData} />}
          <Box sx={{mt: '-1px',
                    borderRadius: '0px',
                    marginTop: '-38px',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgb(212, 219, 226)',
                    width: '99.7%',
                    paddingTop: '20px'}} >
              {userData && <ProfileButton update={() => setKey(key + 1)} user={userData} />}
              {userData && <ProfileInformationPanel key={key} user={userData} />}
              {userData && <SettingsContainer user={userData} />}
              {userData && <ProfileBiography user={userData} />}
          </Box>
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
