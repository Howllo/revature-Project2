import {Box, Button, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useNav from "./NavContext/UseNav.jsx";
import {Link} from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {useEffect, useState} from "react";
import CreatePost from "../Post/CreatePost/CreatePost.jsx";
import Cookies from "js-cookie";
import "./Navbar.css";

const Navbar = () => {
    const {currentNav, setCurrentNav, getUser} = useNav();
    const [openPostPopup, setOpenPostPopup] = useState()
    const [username] = useState(Cookies.get('username'))
    const [user, setUser] = useState()

    useEffect(() =>{
        getUser().then(data =>{
            setUser(data)
        })
    },[])
    

    const handleHomeClick = () => {
        setCurrentNav('home');
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
        <Box className="NavbarContainer">
            {openPostPopup &&  <CreatePost handleOpen={handleOpeningPost}/>}
            <Link to={'/'}>
                <Button onClick={handleHomeClick} variant="text">
                    {currentNav === 'home' ? <HomeIcon/> : <HomeOutlinedIcon/>}
                    {currentNav === 'home' ? <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Home</Typography>
                        : <Typography sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} variant="body1">Home</Typography>}
                </Button>
            </Link>
            <Link to={`/profile/${username}`} state={{ userObj: user}}>
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


            <Button className="NewPostButton" size="large" onClick={handleOpeningPost}>
                <PostAddIcon className="PostAddIcon"/>
                New Post
            </Button>
        </Box>
    )
}

export default Navbar;