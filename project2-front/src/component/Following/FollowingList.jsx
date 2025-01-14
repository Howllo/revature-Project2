import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useContext } from "react";
// import PropTypes from "prop-types";
import Cookies from "js-cookie";
import FollowingListContext from "./Context/FollowingListProvider";

const FollowingList = ({ following }) => {
  const { handleDeleteFollowing } = useContext(FollowingListContext);
  const currentUsername = Cookies.get("username");

  return (
    <>
      <ListItem sx={{ gap: 3 }}>
        <ListItemAvatar>
          <Avatar src={following.profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ mb: 1 }}>{following.displayName}</Typography>
          }
          secondary={
            <>
              <Typography sx={{ mb: 1 }}>@{following.username}</Typography>
              <Typography sx={{ mb: 0.5 }}>{following.biography}</Typography>
              <Typography>{following.followerCount} Followers</Typography>
              <Typography>{following.followingCount} Following</Typography>
            </>
          }
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handleDeleteFollowing(currentUsername, following.username);
          }}
        >
          Unfollow
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

// FollowingList.propTypes = {
//   following: PropTypes.shape({
//     profilePic: PropTypes.string.isRequired,
//     displayName: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     biography: PropTypes.string.isRequired,
//     followerCount: PropTypes.number.isRequired,
//     followingCount: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default FollowingList;
