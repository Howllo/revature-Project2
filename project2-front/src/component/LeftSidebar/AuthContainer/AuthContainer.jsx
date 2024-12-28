import {Box} from "@mui/material";
import UserAvatar from "../../AvatarComponent/UserAvatar.jsx";
import Cookies from "js-cookie";
import Navbar from "../../Navbar/Navbar.jsx";

const AuthContainer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingRight: '20px',
            }}
        >
            <Box
                sx={{
                    paddingBottom: '20px',
                    paddingRight: '60px',
                }}
            >
                <UserAvatar username={Cookies.get('username')} image={Cookies.get('profile_pic')}/>
            </Box>
            <Navbar/>
        </Box>
    )
}

export default AuthContainer;