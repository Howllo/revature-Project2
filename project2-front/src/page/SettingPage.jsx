import {Box, Button, InputAdornment, OutlinedInput} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import {useState} from "react";
import {projectApi} from "../util/axios.js";

const SettingsPage = () => {
    const [displayName, setDisplayName] = useState()

    const changeName = async (username) => {
        if(displayName === undefined) {
            console.log(`This username was: ${displayName}`);
            return [];
        }

        try {
            const response = await projectApi.put(`/user/${username}/display_name`, {
                    displayName: displayName
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            return response.data;
        } catch (e) {
            console.error('Error getting search results for user: ', e.status);
        }
    }

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    }

    const handleDisplayChange = async () => {
        await changeName(displayName);
    }

    return (
        <Box>
            <OutlinedInput
                required
                type="text"
                className="text"
                value={displayName}
                onChange={(e) => handleDisplayNameChange(e)}
                placeholder="Enter new display name"
                sx={{
                    maxWidth: '450px',
                    marginTop: '10px',
                    width: '100%',
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                }
            />

            <Button
                variant="contained"
                onClick={handleDisplayChange}

                sx={{
                    marginTop: '10px',
                }}
            >
                Change Name
            </Button>
        </Box>
    )
}

export default SettingsPage;