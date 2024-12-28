import {Box, Button, styled} from "@mui/material";
import {HorizontalRule} from "@mui/icons-material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {usePost} from "../Context/UsePost.jsx";
import YouTubeDialog from "../CreatePost/YouTubeDialog.jsx";
import {useState} from "react";


const PostInteractiveBar = () => {
    const {handleImageSelect, handleYouTubeSelect} = usePost();
    const [dialogOpen, setDialogOpen] = useState(false);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileSelect = (e) => {
        handleImageSelect(e.target.files[0]);
    }

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            <HorizontalRule
                sx={{
                    marginTop: '10px',
                    mx: -1.25,
                    color: 'rgb(212,217,225)',
                    width: '103.7%',
                    height: '1px',
                    backgroundColor: 'rgb(212,217,225)',
                }}
            />

            <Box
                sx={{
                    flexDirection: 'row',
                }}
            >
                <Button
                    role={undefined}
                    component="label"
                    sx={{
                        minWidth: '32px',
                        width: '32px',
                        height: '32px',
                        padding: '4px',
                        '& .MuiButton-startIcon': {
                            margin: 0
                        }
                    }}
                    startIcon={
                        <ImageOutlinedIcon
                            sx={{
                                color: 'rgb(56,153,249)'
                            }}
                        />
                    }
                >
                    <VisuallyHiddenInput
                        type="file"
                        accept=".jpeg,.png,.jpg,.gif,.bmp,.ico,.tif,.tiff,.webp,.svg,.svgz,.ai,.drw,.pct,.sp,.xcf,.psd,.raw,.heic, image/*"
                        onChange={(e) => handleFileSelect(e)}
                    />
                </Button>

                <Button
                    role={undefined}
                    component="label"
                    sx={{
                        minWidth: '32px',
                        width: '32px',
                        height: '32px',
                        padding: '4px',
                        '& .MuiButton-startIcon': {
                            margin: 0
                        }
                    }}
                    startIcon={
                        <TheatersOutlinedIcon
                            sx={{
                                color: 'rgb(56,153,249)'
                            }}
                        />
                    }
                >
                    <VisuallyHiddenInput
                        type="file"
                        accept=".mp4, .m4a, .m4b, .webm, .mov, .gif"
                        onChange={(e) => handleFileSelect(e)}
                    />
                </Button>

                <Button
                    role={undefined}
                    component="label"
                    onClick={() => setDialogOpen(true)}
                    sx={{
                        minWidth: '32px',
                        width: '32px',
                        height: '32px',
                        padding: '4px',
                        '& .MuiButton-startIcon': {
                            margin: 0
                        }
                    }}
                    startIcon={
                        <YouTubeIcon
                            sx={{
                                color: 'rgb(56,153,249)'
                            }}
                        />
                    }
                >
                </Button>

                <Box>
                    {dialogOpen ? <YouTubeDialog setMedia={handleYouTubeSelect} handleClose={setDialogOpen}
                                                 open={dialogOpen}/> : null}
                </Box>
            </Box>
        </Box>
    )
}

export default PostInteractiveBar;