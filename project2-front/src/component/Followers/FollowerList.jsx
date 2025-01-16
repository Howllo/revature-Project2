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
import { useContext, useEffect, useState } from "react";
import FollowerListContext from "./Context/FollowerListProvider";
import { useUserProfile } from "../UserProfile/Context/UseUserProfile";

const FollowerList = ({ follower }) => {
  const currentUser = Cookies.get("username");
  const { handleDeleteFollower, username, handleGetFollowers } = useContext(FollowerListContext);
  const { setFollow, checkFollow, removeFollow} = useUserProfile();
  const [isFollowed, setIsFollowed] = useState();

  useEffect(() => {
    const x = checkFollow(Cookies.get("user_id"), follower.username);
    x.then((value) => {
      setIsFollowed(value);
    });
  }, [follower]);

  const handleFollow = async () => {
    isFollowed
      ? removeFollow(currentUser, follower.username)
      : setFollow(Cookies.get("user_id"), follower.username);
    setIsFollowed(!isFollowed);
    setTimeout(() => {handleGetFollowers()}, 100)
  };



  if(currentUser === follower.username){
    return (
      <>
        <ListItem sx={{}} key={follower.username}>
          <ListItemAvatar>
            <Avatar src={follower.profilePic} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ mb: 1, color: "black", fontSize: "large" }}>
                {follower.displayName}
              </Typography>
            }
            secondary={
              <>
                <Typography sx={{ mb: 1, color: "black", fontSize: "small" }}>
                  @{follower.username}
                </Typography>
                <Typography sx={{ mb: 0.5, color: "black", fontSize: "small" }}>
                  {follower.biography}
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {follower.followerCount} Followers
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {follower.followingCount} Following
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  }
  if(currentUser === username){
    return (
      <>
        <ListItem sx={{}} key={follower.username}>
          <ListItemAvatar>
            <Avatar src={follower.profilePic} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ mb: 1, color: "black", fontSize: "large" }}>
                {follower.displayName}
              </Typography>
            }
            secondary={
              <>
                <Typography sx={{ mb: 1, color: "black", fontSize: "small" }}>
                  @{follower.username}
                </Typography>
                <Typography sx={{ mb: 0.5, color: "black", fontSize: "small" }}>
                  {follower.biography}
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {follower.followerCount} Followers
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {follower.followingCount} Following
                </Typography>
              </>
            }
          />
          <Button
              variant="outlined"
              size="small"
              onClick={handleFollow}
            >
              {isFollowed ? "Unfollow" : "Follow Back"}
            </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  }
  return (
    <>
      <ListItem sx={{}} key={follower.username}>
        <ListItemAvatar>
          <Avatar src={follower.profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ mb: 1, color: "black", fontSize: "large" }}>
              {follower.displayName}
            </Typography>
          }
          secondary={
            <>
              <Typography sx={{ mb: 1, color: "black", fontSize: "small" }}>
                @{follower.username}
              </Typography>
              <Typography sx={{ mb: 0.5, color: "black", fontSize: "small" }}>
                {follower.biography}
              </Typography>
              <Typography sx={{ color: "black", fontSize: "small" }}>
                {follower.followerCount} Followers
              </Typography>
              <Typography sx={{ color: "black", fontSize: "small" }}>
                {follower.followingCount} Following
              </Typography>
            </>
          }
        />
        <Button
            variant="outlined"
            size="small"
            onClick={handleFollow}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
export default FollowerList;
