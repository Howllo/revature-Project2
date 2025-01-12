import {Box, Button, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import useNav from "./NavContext/UseNav.jsx";
import {Link} from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {useEffect, useState} from "react";
import CreatePost from "../Post/CreatePost/CreatePost.jsx";
import Cookies from "js-cookie";
import "./Navbar.css";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";

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
            <UserAvatar username={Cookies.get("username")} image={Cookies.get("profile_pic")}/>
            {openPostPopup &&  <CreatePost handleOpen={handleOpeningPost}/>}
            <Link to={'/'}>
                <Button onClick={handleHomeClick} variant="text">
                    <HomeIcon/>
                    <Typography className="NavBarIconButton" sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Home</Typography>
                </Button>
            </Link>
            <Link to={`/profile/${username}`} state={{ userObj: user}}>
                <Button onClick={handleProfileClick} variant="text">
                    <AccountCircleIcon/>
                    <Typography className="NavBarIconButton" sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Profile</Typography>
                </Button>
            </Link>
            <Link to={'/setting'}>
                <Button onClick={handleSettingsClick} variant="text">
                    <SettingsIcon/>
                    <Typography className="NavBarIconButton" sx={{color: 'rgb(11, 15, 20)', textTransform: 'capitalize', fontWeight: 500}} fontFamily="Inter, sans-serif">Setting</Typography>
                </Button>
            </Link>


            <Button className="NewPostButton"  onClick={handleOpeningPost}>
                <PostAddIcon className="PostAddIcon"/>
                <div className="NewPostDiv">New Post</div>
            </Button>
        </Box>
    )
}

export default Navbar;