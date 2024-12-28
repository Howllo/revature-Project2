import {Box} from "@mui/material";
import UserAvatar from "../AvatarComponent/UserAvatar.jsx";

const UserDisplay = ({user}) => {
    return (
        <Box>
            <Box>
                <img
                    src={'https://picsum.photos/1500/500'}
                    alt="Post Image"
                    loading={"lazy"}
                    style={{
                        marginTop: '10px',
                        width: '100%',
                        height: '100%',
                        borderRadius: '0px',
                    }}
                />
                <Box
                    sx={{
                        mt: '-41px',
                        marginLeft: '12px',
                    }}
                >
                    <UserAvatar username={user.username} width={64} height={64}/>
                </Box>
            </Box>
        </Box>
    )
}

export default UserDisplay;