import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
import {Box, OutlinedInput, Typography} from "@mui/material";

export default function BioTextField() {
  const { setBioText, settingsData } = useContext(SettingsContext);
  return (
    <Box
        sx={{
            display: 'flex',
            marginTop: '20px',
            flexDirection: 'column',
        }}
    >
        <Typography
            variant="h4"
            sx={{
                paddingLeft: '5px',
                marginTop: '10px',
                fontSize: '16px',
                fontWeight: 600,
                color: 'rgb(66, 87, 108)'
            }}
        >
            Description
        </Typography>

        <OutlinedInput
            placeholder="e.g. programmer, gamer, and avid rockstar."
            maxLength={300}
            variant="outlined"
            multiline
            minRows={3}
            maxRows={5}
            value={settingsData.bioText}
            onChange={setBioText}
            fullWidth
            sx={{
                marginTop: '5px',
            }}
        />
    </Box>
  );
}
