import {Avatar, Link} from "@mui/material";

import PropTypes from "prop-types";

const UserAvatar = ({username, image, width = 42, height = 42}) => {
    return (
        <Link to={"/" + username}>
            <Avatar alt={name} src={image}
                    sx={{
                        borderColor: 'rgb(212,217,225)',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        width: {width},
                        height: {height},
                    }}
            />
        </Link>
    )
}

UserAvatar.propTypes = {
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default UserAvatar;