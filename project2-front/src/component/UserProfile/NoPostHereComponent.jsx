import {Box, Typography} from "@mui/material";
import SpaIcon from '@mui/icons-material/Spa';
import "./NoPostHereComponent.css";

const NoPostHereComponent = () => {
  return (
    <Box className='PrimaryBox'>
      <Box className='HolderBox'>
        <Box className='IconHolderBox'>
          <SpaIcon className='SpaIcon'/>
        </Box>

        <Typography
          variant="h6"
          color="secondary"
          className='Typography'
        >
          No posts yet.
        </Typography>
      </Box>
    </Box>
  )
}

export default NoPostHereComponent;