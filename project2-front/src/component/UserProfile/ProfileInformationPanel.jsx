import {Box, Typography} from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import { useEffect } from "react";
import {useUserProfile} from "./Context/UseUserProfile.jsx";

const ProfileInformationPanel = ({user}) => {

    const { listPostData, getUserPost} = usePost();
    const {getId} = useUserProfile();

    useEffect(() => {
        const x = getId(user.username)
        x.then(value => {
            getUserPost(value)
        })
    }, [user]);

    return (
        <Box
            sx={{
                flexDirection: 'column',
                display: 'flex',
            }}
        >
            <Typography variant="h4" color="primary"
                sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "600",
                    fontSize: "34px",
                    color: "black",
                    mt: '-15px',
                }}
            >
                {user.displayName || user.username}
            </Typography>

            <Typography variant="h6" color="secondary"
                        sx={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "300",
                            fontSize: "13px",
                            color: "rgb(66, 87, 108)",
                        }}
            >
                {user.username}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Typography variant="h6" color="primary"
                                sx={{
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: "800",
                                    fontSize: "13px",
                                    color: "rgb(66, 87, 108)",
                                }}
                    >
                        {user.followerCount}
                    </Typography>

                    <Typography variant="h6" color="secondary"
                                sx={{
                                    marginLeft: '5px',
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: "300",
                                    fontSize: "13px",
                                    color: "rgb(66, 87, 108)",
                                }}
                    >
                        followers
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Typography variant="h6" color="primary"
                                sx={{
                                    marginLeft: '10px',
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: "800",
                                    fontSize: "13px",
                                    color: "rgb(66, 87, 108)",
                                }}
                    >
                        {user.followingCount}
                    </Typography>

                    <Typography variant="h6" color="secondary"
                                sx={{
                                    marginLeft: '5px',
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: "300",
                                    fontSize: "13px",
                                    color: "rgb(66, 87, 108)",
                                }}
                    >
                        following
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Typography variant="h6" color="primary"
                                sx={{
                                    marginLeft: '10px',
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: "800",
                                    fontSize: "13px",
                                    color: "rgb(66, 87, 108)",
                                }}
                    >
                        {listPostData.length}
                    </Typography>

                    <Typography variant="h6" color="secondary"
                                sx={{
                                    marginLeft: '5px',
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: "300",
                                    fontSize: "13px",
                                    color: "rgb(66, 87, 108)",
                                }}
                    >
                        posts
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileInformationPanel;