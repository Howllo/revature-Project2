import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
import { useContext } from "react";
import FollowerListContext from "./Context/FollowerListProvider";

const FollowerList = ({ follower }) => {
  const currentUser = Cookies.get("username");
  const { handleDeleteFollower } = useContext(FollowerListContext);

  return (
    <>
      <ListItem sx={{ gap: 3 }} key={follower.username}>
        <ListItemAvatar>
          <Avatar src={follower.profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ mb: 1 }}>{follower.displayName}</Typography>
          }
          secondary={
            <>
              <Typography sx={{ mb: 1 }}>@{follower.username}</Typography>
              <Typography sx={{ mb: 0.5 }}>{follower.biography}</Typography>
              <Typography>{follower.followerCount} Followers</Typography>
              <Typography>{follower.followingCount} Following</Typography>
            </>
          }
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handleDeleteFollower(follower.username, currentUser);
          }}
        >
          Delete Follower
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
export default FollowerList;
