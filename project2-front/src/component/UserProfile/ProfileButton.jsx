import {Box, Button, IconButton} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useUserProfile} from "./Context/UseUserProfile.jsx";
import Cookies from "js-cookie";

const ProfileButton = ({user}) => {
    const { setFollow } = useUserProfile();

    const handleFollow = async () => {
        setFollow(Cookies.get("user_id"), user.id);
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

export default ProfileButton;