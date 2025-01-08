﻿import {Box, Button, IconButton} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useUserProfile} from "./Context/UseUserProfile.jsx";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileButton = ({user}) => {
    const { setFollow, checkFollow, removeFollow } = useUserProfile();
    const [isFollowed, setIsFollowed] = useState();
    
    useEffect(() => {
        const x = checkFollow(Cookies.get("user_id"), user.username)
        x.then(value => {
            setIsFollowed(value)
        })
    }, []);

    const handleFollow = async () => {
        isFollowed ? removeFollow(Cookies.get("user_id"), user.username) : setFollow(Cookies.get("user_id"), user.username);
    }
    

    if(Cookies.get("username") === user.username){
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    borderColor: 'gray',
                    borderWidth: '1px',
                    mt: '-20px',
                    paddingRight: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        flexGrow: 1,
                    }}
                >
                    <Link><Button
                        //onClick={handleFollow}

                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: 6,
                            textTransform: "capitalize",
                        }}
                    >Edit</Button></Link>

                    <IconButton
                        sx={{
                            marginLeft: '5px',
                            backgroundColor: 'grey',
                        }}
                    >
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
            </Box>
        )
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                borderColor: 'gray',
                borderWidth: '1px',
                mt: '-20px',
                paddingRight: '10px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    flexGrow: 1,
                }}
            >
                <Button
                    onClick={handleFollow}

                    variant="contained"
                    size="small"
                    sx={{
                        borderRadius: 6,
                        textTransform: "capitalize",
                    }}
                >{isFollowed ? "Unfollow" : "Follow"}</Button>

                <IconButton
                    sx={{
                        marginLeft: '5px',
                        backgroundColor: 'grey',
                    }}
                >
                    <MoreHorizIcon/>
                </IconButton>
            </Box>
        </Box>
    )        
    
}

export default ProfileButton;
