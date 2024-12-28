import {Box, Button} from "@mui/material";
import {Backdrop} from "@mui/material";
import UserAvatar from "../../AvatarComponent/UserAvatar.jsx";
import Cookies from "js-cookie";
import PostTextField from "./PostTextField.jsx";
import MediaContainer from "../DisplayPost/MediaContainer.jsx";
import PostInteractiveBar from "../DisplayPost/PostInteractiveBar.jsx";
import {usePost} from "../Context/UsePost.jsx";

const CreatePost = ({handleOpen, child}) => {
    const {resetPost, previewUrl, isVideo, submitPost, getPost} = usePost();

    const cancelPost = () => {
        resetPost();
        handleOpen();
    }

    const handleSubmit = async () => {
        handleOpen();
        if(child === undefined || child === null) {
            await submitPost(null);
        } else {
            await submitPost(child);
        }
        resetPost();
        getPost();
    }

    return (
        <Backdrop
            sx={{
                zIndex: 1051,
            }}
            open
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '550px',
                    maxWidth: '550px',
                    minHeight: '300px',
                    maxHeight: '90vh',
                    height: 'auto',
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    padding: '10px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '20%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'capitalize'
                        }}
                        onClick={cancelPost}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'capitalize',
                        }}
                        onClick={handleSubmit}
                    >
                        Post
                    </Button>
                </Box>

                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: '5px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    overflow: 'auto',
                }}>
                    <Box
                        sx={{

                        }}
                    >
                        <UserAvatar username={Cookies.get('username')}/>
                    </Box>
                    <PostTextField/>
                </Box>


                <Box
                    sx={{
                        maxWidth: '350px',
                        maxHeight: '350px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: '50px',
                    }}
                >
                    {previewUrl ? <MediaContainer media={previewUrl} isVideo={isVideo}/> : null}
                </Box>
                <PostInteractiveBar/>
            </Box>
        </Backdrop>
    )
}

export default CreatePost;