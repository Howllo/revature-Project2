import {Box, Button, IconButton} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useUserProfile} from "./Context/UseUserProfile.jsx";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ProfileButton = ({user}) => {
    const { setFollow } = useUserProfile();

    const handleFollow = async () => {
        setFollow(Cookies.get("user_id"), user.id);
    }

    if(Cookies.get("username") == user.username){
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
    else{
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
                    >Follow</Button>

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
}

export default ProfileButton;