import {Box, Button} from "@mui/material";
import PropTypes from 'prop-types';
import {allowedImageTypes, allowedVideoTypes} from "../../../util/MediaSupport.js";
import {useEffect, useState} from "react";
import MediaBackdrop from "../MediaBackdrop.jsx";
import {usePost} from "../Context/UsePost.jsx";

const MediaContainer = ({media, isVideo}) => {
    const {resetPost} = usePost();
    const [youtube, setYoutube] = useState("")
    const [mediaType, setMediaType] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    useEffect(() => {
        if(media === null){
            return;
        }

        const mediaType = media.split('.').pop();
        if (media.includes('youtube') ){
            setMediaType('youtube');
            const newUrl = media.replace('watch?v=','embed/')
            setYoutube(newUrl);
        } else if (allowedVideoTypes.includes(mediaType) || isVideo) {
            setMediaType('video');
        } else if (allowedImageTypes.includes(mediaType)) {
            setMediaType('image');
        } else if(media.includes('http') || media.includes('https')) {
            setMediaType('image');
        } else {
            resetPost();
        }
    }, [media]);

    return (
        <Box>
            {
                mediaType === 'video' ? (
                    <video
                        src={media}
                        controls
                        style={{
                            marginTop: '10px',
                            width: '100%',
                            height: '100%',
                            borderRadius: '15px',
                        }}
                    >
                    </video>
                ) : null
            }

            <Button
                disableRipple={true}
                onClick={handleOpen}
            >
                {
                    mediaType === 'image' ? (
                        <img
                            src={media}
                            alt="Post Image"
                            loading={"lazy"}
                            style={{
                                marginTop: '10px',
                                width: '100%',
                                height: '100%',
                                borderRadius: '15px',
                            }}
                        />
                    ) : null
                }
            </Button>

            {
                mediaType === 'youtube' ? (
                        <iframe width="560" height="315" src={youtube}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                        </iframe>
                ) : null
            }


            {open ? <MediaBackdrop media={media} open={open} handleClose={handleClose}/> : null}
        </Box>
    )
}

MediaContainer.propTypes = {
    media: PropTypes.string.isRequired,
    isVideo: PropTypes.bool
};

export default MediaContainer;