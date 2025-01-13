import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const FollowerList = ({ follower }) => {
  return (
    <>
      <ListItem sx={{ gap: 5 }}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography sx={{ mb: 1 }}>Display Name</Typography>}
          secondary={
            <>
              <Typography sx={{ mb: 1 }}>@Username</Typography>
              <Typography sx={{ mb: 0.5 }}>Biography</Typography>
              <Typography>50 Followers</Typography>
            </>
          }
        />
        <Button variant="outlined" size="small">
          Delete Follower
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default FollowerList;
