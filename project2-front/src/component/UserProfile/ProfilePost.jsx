import {Box} from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import { useEffect } from "react";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {useUserProfile} from "./Context/UseUserProfile.jsx";
import PropTypes from "prop-types";

const ProfilePost = ({user}) => {
    const {getId} = useUserProfile();
    const { listPostData, getUserPost } = usePost();
        
        useEffect(() => {
            const x = getId(user.username)
            x.then(value => {
                getUserPost(value)
            })
        }, [user]);

        return (
          <Box>
            {listPostData.length > 0 && <Box
                sx={{
                  maxWidth: "104.7%",
                  width: "104.7%",
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {listPostData.map((post) => (
                  <Box key={post.id} sx={{ml: '-1px', mt: '-1px'}}>
                    <PostContainer
                      post={post}
                      isComment={false}
                    />
                  </Box>
                ))}
              </Box>
            }
          </Box>
        );
}

ProfilePost.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfilePost;