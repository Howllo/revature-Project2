import UserAvatar from "../AvatarComponent/UserAvatar.jsx";
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";
import { Link } from "react-router-dom";

const SearchResult = ({user, setSearchTerm}) => {
    const [userData] = useState(user);

    return (
        <Link to={`/${user.username.toLowerCase()}`} state={{ userObj: user }} style={{ textDecoration: 'none' }}>
            <Button
                disableRipple={true}

                onClick={() => {setSearchTerm("")}}

                sx={{
                    width: '100%',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '&:active': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        transform: 'scale(0.98)',
                        transition: 'transform 0.1s',
                    },
                    display: 'flex',
                    justifyContent: 'flex-start',
                    maxWidth: '100%'
                }}
            >
                <Box
                    key={user.id}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'Left',
                        borderRadius: '10px',
                        paddingTop: "10px",
                        paddingRight: "10px",
                        gap: 1
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                        }}
                    >
                        <UserAvatar username={userData.username} />

                        <Box
                            sx={{
                                paddingLeft: "20px",
                                flexDirection: 'column',
                                flex: 1,
                                minWidth: 0,
                                maxWidth: 'calc(100% - 60px)',
                                overflow: 'hidden',
                                paddingRight: '10px',
                            }}
                        >
                            <Box>
                                <Typography noWrap variant="body1" color="textSecondary"
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                width: '100%',
                                                textAlign: 'left',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: 'block'
                                            }}
                                >
                                    {userData.displayName || userData.username}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography noWrap variant="body2" color="textSecondary"
                                            sx={{
                                                fontSize: '14px',
                                                width: '100%',
                                                textAlign: 'left',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: 'block'
                                            }}
                                >
                                    @{userData.username}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Button>
        </Link>
    )
}

export default SearchResult;