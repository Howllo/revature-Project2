import {Link} from "react-router-dom";
import {Box, Button} from "@mui/material";

const AuthButtons = () => {
    return (
        <Box
            sx={{
                marginTop: '20px',
            }}
        >
            <Link to="/signup">
                <Button variant="contained"
                        size="small"
                        sx={{
                            minWidth: '75px',
                            maxWidth: '75px',
                            minHeight: '35px',
                            maxHeight: '35px',
                            marginLeft: '5px',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: 'rgb(56,155,253)',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: '500',
                        }}
                >
                    Sign up
                </Button>
            </Link>
            <Link to="/signin">
                <Button variant="contained"
                        size="small"
                        sx={{
                            minWidth: '75px',
                            maxWidth: '75px',
                            minHeight: '35px',
                            maxHeight: '35px',
                            marginLeft: '5px',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: 'rgb(212,217,225)',
                            color: 'rgb(66, 87, 108)',
                            textTransform: 'none',
                            fontWeight: '500',
                        }}
                >
                    Sign in
                </Button>
            </Link>
        </Box>
    )
}

export default AuthButtons;