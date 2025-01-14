import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Box, Fab} from "@mui/material";
import PropTypes from "prop-types";
import "./FAB_ScrollReset.css";

const FAB_ScrollReset = ({handleScrollUp}) => {

    return (
        <Box className="FABScrollResetContainer">
            <Fab className="FABScrollContainer" elevation={0} onClick={handleScrollUp} disableRipple={true}>
                <ExpandLessIcon className="ExpandLessIcon"/>
            </Fab>
        </Box>
    )
}

FAB_ScrollReset.propTypes = {
    handleScrollUp: PropTypes.func.isRequired,
};

export default FAB_ScrollReset;