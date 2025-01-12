import {Box, OutlinedInput, Typography} from "@mui/material";
import { useContext } from "react";
import SettingsContext from "../Context/SettingsProvider";
const DisplayNameField = () => {
  let { setDisplayName, settingsData } = useContext(SettingsContext);
  return (
    <Box
        sx={{
            marginTop: '20px',
            display: 'flex',
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
            Display Name
        </Typography>

        <OutlinedInput
            placeholder="e.g. Akira Takashi"
            helperText="50 characters max"
            maxLength={50}
            variant="outlined"
            sx={{
                marginTop: '5px',
                width: "100%",
            }}
            value={settingsData.displayName}
            onChange={setDisplayName}
        />
    </Box>
  );
};

export default DisplayNameField;
