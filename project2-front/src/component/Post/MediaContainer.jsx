import {Box} from "@mui/material";
import PropTypes from 'prop-types';
import {allowedImageTypes, allowedVideoTypes} from "../../util/MediaSupport.js";
import {useEffect, useState} from "react";
import MediaBackdrop from "./MediaBackdrop.jsx";
import {usePost} from "./Context/UsePost.jsx";

const MediaContainer = ({ media, isVideo, isInBackdrop = false}) => {
    const { resetPost } = usePost();
    const [youtube, setYoutube] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

  const toggleMedia = (e) => {
    if (isInBackdrop) return;
    e.stopPropagation();
    e.preventDefault();
    setOpen((prev) => !prev);
  };

    useEffect(() => {
        if (!media) return;

        const mediaType = media.split(".").pop();
        if (media.includes("youtube")) {
            setMediaType("youtube");
            const newUrl = media.replace("watch?v=", "embed/");
            setYoutube(newUrl);
        } else if (allowedVideoTypes.includes(mediaType) || isVideo) {
            setMediaType("video");
        } else if (allowedImageTypes.includes(mediaType)) {
            setMediaType("image");
        } else if (media.includes("http") || media.includes("https")) {
            setMediaType("image");
        } else {
            resetPost();
        }
    }, [media, isVideo, resetPost]);

    return (
        <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              overflow: "hidden",
            }}
        >
            {mediaType === "video" && (
                <video
                    src={media}
                    controls
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        height: "100%",
                        borderRadius: "15px",
                    }}
                ></video>
            )}

            {mediaType === "image" && (
                <img
                    src={media}
                    alt="Post Image"
                    loading={"lazy"}
                    onClick={(e) => toggleMedia(e)}
                    style={{
                        marginTop: "10px",
                        height: "auto",
                        width: "100%",
                        borderRadius: "15px",
                        cursor: isInBackdrop  ? 'default' : "pointer",
                    }}
                />
            )}

            {mediaType === "youtube" && (
                <iframe
                    style={{
                        width: "100%",
                        height: "300px",
                    }}
                    src={youtube}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            )}

            {open && <MediaBackdrop media={media} open={open} handleClose={handleClose} />}
        </Box>
    );
};

MediaContainer.propTypes = {
  media: PropTypes.string.isRequired,
  isVideo: PropTypes.bool,
  isInBackdrop: PropTypes.bool,
};

export default MediaContainer;