import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Cookies from "js-cookie";
import FollowingListContext from "./Context/FollowingListProvider";
import { useUserProfile } from "../UserProfile/Context/UseUserProfile";

const FollowingList = ({ following }) => {
  const { handleDeleteFollowing, username, handleGetFollowing } = useContext(FollowingListContext);
  const currentUsername = Cookies.get("username");
  const { setFollow, checkFollow, removeFollow} = useUserProfile();
  const [isFollowed, setIsFollowed] = useState();

  useEffect(() => {
      const x = checkFollow(Cookies.get("user_id"), following.username);
      x.then((value) => {
        setIsFollowed(value);
      });
    }, [following]);
  
    const handleFollow = async () => {
      isFollowed
        ? removeFollow(currentUsername, following.username)
        : setFollow(Cookies.get("user_id"), following.username);
      setIsFollowed(!isFollowed);
      setTimeout(() => {handleGetFollowing()}, 100)
    };

  if(currentUsername === following.username){
    return (
      <>
        <ListItem sx={{}}>
          <ListItemAvatar>
            <Avatar src={following.profilePic} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ mb: 1, color: "black", fontSize: "large" }}>
                {following.displayName}
              </Typography>
            }
            secondary={
              <>
                <Typography sx={{ mb: 1, color: "black" }}>
                  @{following.username}
                </Typography>
                <Typography sx={{ mb: 0.5, color: "black", fontSize: "small" }}>
                  {following.biography}
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {following.followerCount} Followers
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {following.followingCount} Following
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  }
  if(currentUsername === username){
    return (
      <>
        <ListItem sx={{}}>
          <ListItemAvatar>
            <Avatar src={following.profilePic} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ mb: 1, color: "black", fontSize: "large" }}>
                {following.displayName}
              </Typography>
            }
            secondary={
              <>
                <Typography sx={{ mb: 1, color: "black" }}>
                  @{following.username}
                </Typography>
                <Typography sx={{ mb: 0.5, color: "black", fontSize: "small" }}>
                  {following.biography}
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {following.followerCount} Followers
                </Typography>
                <Typography sx={{ color: "black", fontSize: "small" }}>
                  {following.followingCount} Following
                </Typography>
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
  }
  return (
    <>
      <ListItem sx={{}}>
        <ListItemAvatar>
          <Avatar src={following.profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ mb: 1, color: "black", fontSize: "large" }}>
              {following.displayName}
            </Typography>
          }
          secondary={
            <>
              <Typography sx={{ mb: 1, color: "black" }}>
                @{following.username}
              </Typography>
              <Typography sx={{ mb: 0.5, color: "black", fontSize: "small" }}>
                {following.biography}
              </Typography>
              <Typography sx={{ color: "black", fontSize: "small" }}>
                {following.followerCount} Followers
              </Typography>
              <Typography sx={{ color: "black", fontSize: "small" }}>
                {following.followingCount} Following
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
