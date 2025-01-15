import { createContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {projectApi} from "../../../util/axios.js";
import Cookies from "js-cookie";

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
    const [listPostData, setListPostData] = useState([]);
    const [postData, setPostData] = useState({
        file: null,          // Actual file for FormData
        previewUrl: null,    // Preview URL for display
        comment: '',
        isVideo: false
    });

    useEffect(() => {
        return () => {
            if (postData.previewUrl) {
                URL.revokeObjectURL(postData.previewUrl);
            }
        };
    }, [postData.previewUrl]);

    const handleYouTubeSelect = (url) => {
        if(postData.previewUrl) {
            URL.revokeObjectURL(postData.previewUrl);
        }

        setPostData(prev => ({
            ...prev,
            file: null,
            previewUrl: url ? url : null,
            isVideo: false
        }));
    }

    const handleMediaSelect = (file) => {
        if (postData.previewUrl) {
            URL.revokeObjectURL(postData.previewUrl);
        }

        // Check if it's a video file
        const isVideo = file.type.startsWith('video/');

        setPostData(prev => ({
            ...prev,
            file: file,
            previewUrl: file ? URL.createObjectURL(file) : null,
            isVideo: isVideo
        }));
    };

    const setComment = (comment) => {
        setPostData(prev => ({
            ...prev,
            comment
        }));
    };

    const resetPost = () => {
        if (postData.previewUrl) {
            URL.revokeObjectURL(postData.previewUrl);
        }
        setPostData({
            file: null,
            previewUrl: null,
            comment: '',
            isVideo: false
        });
    };

    const submitPost = async (parentPost) => {
      const token = Cookies.get('jwt');
      if (!token) {
        throw new Error('No authentication token found');
      }

        try {
          const mediaData = new FormData();
          mediaData.append('userId', Cookies.get('user_id'));
          mediaData.append('postParent', parentPost ? parentPost.id : null);
          mediaData.append('comment', postData.comment);
          mediaData.append('media', postData.file[0]);

          const response = await projectApi.post('/post/create',
              mediaData,
              {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  }
              }
          );

          resetPost();
          return response.data;
      } catch (error) {
          console.error('Error submitting post:', error.status);
          throw error;
      }
    }

    const getPost = async () => {
        try {
            const response = await projectApi.get("/post/all", {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const sortedByDate = response.data.sort((a, b) => {
                return new Date(b.postAt) - new Date(a.postAt);
            });

            setListPostData(sortedByDate);
        } catch (error) {
            console.error(`Error getPost: ${error.status}`);
        }
    }

    const deletePost = async (post) => {
        const token = Cookies.get('jwt');
        try {
                const response  = await projectApi.delete(`/post/${post.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if(response.status === 200) {
                    setListPostData(listPostData.filter(item => item.id !== post.id));
                }
        } catch (e) {
            console.error('Error deleting post: ', e.status);
        }
    }

    const editPost = async (id, comment, postAt) => {
        const token = Cookies.get('jwt');
        try {
            const response  = await projectApi.put(`/post/${id}`,{
                    id: id,
                    comment: comment,
                    postAt: postAt
            },
        {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

             if(response.status === 200) {
                 await getPost();
             }
        } catch (e) {
            console.error('Error editing post: ', e.status);
        }
    }

    const likePost = async (id) => {
        const token = Cookies.get('jwt');
        if(!token){
            return false;
        }

        try{
            const response = await projectApi.post(`/post/${id}/like/${Cookies.get('user_id')}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if(response.status === 200 && response.data.includes("Operation completed successfully.")) {
                return true;
            } else {
                return false;
            }
        } catch(e) {
            console.error(`${e.status} - ${e.message}`);
        }
    }

    const isUserLike = async (postId) => {
        const token = Cookies.get('jwt');
        if(!token) {
            return false;
        }

        try{
            const response  = await projectApi.get(`/post/check/${postId}/like/${Cookies.get('user_id')}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (e) {
            console.error('Error getting likes for post: ', e.status);
        }
    }

    const getChildren = async (postId) => {
        try {
            const response  = await projectApi.get(`/post/${postId}/comments`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (e) {
            console.error('Error getting likes for post: ', e.status);
        }
    }

    const getUserPost = async (id) => {
        try {
            const response = await projectApi.get("/post/all", {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const sortedByDate = response.data.sort((a, b) => {
                return new Date(b.postAt) - new Date(a.postAt);
            });

            const filterByUser = sortedByDate.filter(userPost => userPost.userId === id);

            setListPostData(filterByUser);
        } catch (error) {
            console.error(`Error getPost: ${error.status}`);
        }
    }

  const getPostUnique = async (postId) => {
    if(!postId){
      return;
    }

    try {
      const response  = await projectApi.get(`/post/${postId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data;
    } catch (e) {
      console.error('Error getting likes for post: ', e.status);
    }
  }

  const value = {
    listPostData,
    setListPostData,
    file: postData.file,
    previewUrl: postData.previewUrl,
    comment: postData.comment,
    isVideo: postData.isVideo,
    handleImageSelect: handleMediaSelect,
    handleYouTubeSelect: handleYouTubeSelect,
    setComment,
    submitPost,
    resetPost,
    getPost,
    deletePost,
    editPost,
    likePost,
    isUserLike,
    getChildren,
    getUserPost,
    getPostUnique
  };

  return (
      <PostContext.Provider value={value}>
          {children}
      </PostContext.Provider>
  );
};

PostProvider.propTypes = {
    children: PropTypes.node,
};


export default PostContext;