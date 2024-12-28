import {Box, Button, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useNav from "./NavContext/UseNav.jsx";
import {Link} from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {useState} from "react";
import CreatePost from "../Post/CreatePost/CreatePost.jsx";


const Navbar = () => {
    const {currentNav, setCurrentNav} = useNav();
    const [openPostPopup, setOpenPostPopup] = useState()

    const handleHomeClick = () => {
        setCurrentNav('home');
    }

    const handleNotificationsClick = () => {
        setCurrentNav('notifications');
    }

    const handleProfileClick = () => {
        setCurrentNav('profile');
    }

    const handleSettingsClick = () => {
        setCurrentNav('settings');
    }

    const handleOpeningPost = () => {
        if(openPostPopup){
            setOpenPostPopup(false);
        } else {
            setOpenPostPopup(true);
        }
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                height: 224,
                justifyContent: 'left',
                alignItems: 'left',
        }}>
            {openPostPopup &&  <CreatePost handleOpen={handleOpeningPost}/>}


            <Link to={'/'}>
                <Button onClick={handleHomeClick} variant="text">
                    {currentNav === 'home' ? <HomeIcon/> : <HomeOutlinedIcon/>}
                    {currentNav === 'home' ? <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Home</Typography>
                        : <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} variant="body1">Home</Typography>}
                </Button>
            </Link>
            <Link to={'/notification'}>
                <Button onClick={handleNotificationsClick} variant="text">
                    {currentNav === 'notifications' ? <NotificationsIcon/> : < NotificationsNoneIcon/>}
                    {currentNav === 'notifications' ? <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Notification</Typography>
                        : <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} variant="body1">Notification</Typography>}
                </Button>
            </Link>
            <Link to={'/profile'}>
                <Button onClick={handleProfileClick} variant="text">
                    {currentNav === 'profile' ? <AccountCircleIcon/> : <AccountCircleOutlinedIcon/>}
                    {currentNav === 'profile' ? <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Profile</Typography>
                        : <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} variant="body1">Profile</Typography>}
                </Button>
            </Link>
            <Link to={'/setting'}>
                <Button onClick={handleSettingsClick} variant="text">
                    {currentNav === 'settings' ? <SettingsIcon/> : <SettingsOutlinedIcon/>}
                    {currentNav === 'settings' ? <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Setting</Typography>
                        : <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} variant="body1">Setting</Typography>}
                </Button>
            </Link>


            <Button
                size="large"
                onClick={handleOpeningPost}
                sx={{
                    fontSize: '16px',
                    marginTop: '30px',
                    color: 'white',
                    backgroundColor: 'rgb(56,154,251)',
                    borderRadius: '30px',
                    textTransform: 'capitalize',
            }}>
                <PostAddIcon
                    sx={{
                        paddingRight: '2px',
                        paddingBottom: '2px'
                    }}
                />
                New Post
            </Button>
        </Box>
    )
}

export default Navbar;