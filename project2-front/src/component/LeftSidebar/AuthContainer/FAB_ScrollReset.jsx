import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Box, Fab} from "@mui/material";
import PropTypes from "prop-types";

const FAB_ScrollReset = ({handleScrollUp, showFAB}) => {
    return (
        <Box
            sx={{
                height: '100vh',
                zIndex: 1000,
                display: showFAB ? 'flex' : 'none',
                justifyContent: 'end',
                alignItems: 'center',
            }}
        >
            <Fab elevation={0}
                 onClick={handleScrollUp}
                 disableRipple={true}
                sx={{
                    backgroundColor: 'rgb(255,255,255)',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: 'transparent'
                    },
                    '&:active': {
                        backgroundColor: 'transparent'
                    },
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgb(195,205,215)',
                }}
            >
                <ExpandLessIcon
                    sx={{
                        color: 'black',
                        fontSize: 30,
                    }}
                />
            </Fab>
        </Box>
    )
}

FAB_ScrollReset.propTypes = {
    handleScrollUp: PropTypes.func.isRequired,
    showFAB: PropTypes.bool.isRequired,
};

export default FAB_ScrollReset;