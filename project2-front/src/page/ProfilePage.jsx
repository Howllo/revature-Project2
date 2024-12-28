import {Box} from "@mui/material";
import UserDisplay from "../component/UserProfile/UserDisplay.jsx";
import ProfileButton from "../component/UserProfile/ProfileButton.jsx";
import ProfileInformationPanel from "../component/UserProfile/ProfileInformationPanel.jsx";
import ProfileBiography from "../component/UserProfile/ProfileBiography.jsx";
import ProfilePost from "../component/UserProfile/ProfilePost.jsx";
import {useEffect, useState} from "react";
import {UserProfileProvider} from "../component/UserProfile/Context/UserProfileProvider.jsx";
import {useLocation} from "react-router-dom";

const ProfilePage = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if(location.state?.userObj){
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
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                {/* User Profile Information */}
                <Box>
                    {userData && <UserDisplay user={userData} />}
                    {userData && <ProfileButton user={userData} />}
                    {userData && <ProfileInformationPanel user={userData} />}
                    {userData && <ProfileBiography user={userData} />}
                </Box>

                {/* User Post */}
                <Box>
                    <ProfilePost/>
                </Box>
            </Box>
        </UserProfileProvider>
    )
}

export default ProfilePage;