import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Box, Fab} from "@mui/material";
import PropTypes from "prop-types";
import "./FAB_ScrollReset.css";

const FAB_ScrollReset = ({handleScrollUp, showFAB}) => {

    return (
        <Box className="FABScrollResetContainer">
            <Fab className="FABScrollContainer" disableElevation onClick={handleScrollUp} disableRipple={true}>
                <ExpandLessIcon className="ExpandLessIcon"/>
            </Fab>
        </Box>
    )
}

FAB_ScrollReset.propTypes = {
    handleScrollUp: PropTypes.func.isRequired,
    showFAB: PropTypes.bool.isRequired,
};

export default FAB_ScrollReset;