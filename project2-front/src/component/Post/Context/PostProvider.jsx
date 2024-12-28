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
        try {
            let mediaString = null;

            if (postData.file) {
                const reader = new FileReader();
                const base64String = await new Promise((resolve) => {
                    reader.onload = () => {
                        const base64 = reader.result.split(',')[1];
                        resolve(base64);
                    };
                    reader.readAsDataURL(postData.file);
                });
                mediaString = `data:${postData.file.type};base64,${base64String}`;
            } else if (postData.previewUrl) {
                mediaString = postData.previewUrl;
            }

            console.log(parentPost);

            const postPayload = {
                postParent: parentPost || null,
                user: {
                    id: Cookies.get('user_id')
                },
                comment: postData.comment,
                media: mediaString
            };

            const token = Cookies.get('jwt');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await projectApi.post('/post/create',
                postPayload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            resetPost();
            return response.data;
        } catch (error) {
            console.error('Error submitting post:', error);
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
        try{
            const response  = await projectApi.post(`/post/${id}/like/${Cookies.get('user_id')}`, {
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
            console.error(`Error liking a post: ${e.status} - ${e.message}`);
        }
    }

    const getLikes = async (postId) => {
        const token = Cookies.get('jwt');
        try {
            const response  = await projectApi.get(`/post/${postId}/likes`, {
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

    const isUserLike = async (postId) => {
        const token = Cookies.get('jwt');
        try{
            const response  = await projectApi.get(`/post/check/${postId}/like/${Cookies.get('user_id')}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (e) {
            console.error('Error getting likes for post: ', e.message);
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
        getLikes,
        isUserLike,
        getChildren
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