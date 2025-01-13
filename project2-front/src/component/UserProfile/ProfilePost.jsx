﻿import {Box} from "@mui/material";
import { usePost } from "../Post/Context/UsePost.jsx";
import { useEffect } from "react";
import PostContainer from "../Post/DisplayPost/PostContainer.jsx";
import {useUserProfile} from "./Context/UseUserProfile.jsx";
import PropTypes from "prop-types";
import NoPostHereComponent from "./NoPostHereComponent.jsx";

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
            {listPostData.length > 0 ? <Box
                sx={{
                  maxWidth: "104.7%",
                  width: "104.7%",
                  display: 'flex',
                  flexDirection: 'column',

                  marginLeft: '-1px'
                }}
              >
                {listPostData.map((post) => (
                  <Box key={post.id}>
                    <PostContainer
                      post={post}
                      isComment={false}
                    />
                  </Box>
                ))}


              </Box> :

              <Box>
                {listPostData.length === 0 && <NoPostHereComponent/>}
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