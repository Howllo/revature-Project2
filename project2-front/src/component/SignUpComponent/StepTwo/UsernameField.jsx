import {Box, InputAdornment, OutlinedInput, Typography} from "@mui/material";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import {useSignup} from "../Context/UseSignup.jsx";

export const UsernameField = () => {
    const { data, setData } = useSignup();
    const yourName = "Your username is @" + (data.username || "");

    return (
        <Box sx={{ marginTop: '30px' }}>
            <OutlinedInput
                required
                type="text"
                id="outlined-required"
                placeholder="Enter your username"
                variant="outlined"
                value={data.username || ""}
                onChange={(e) => setData({
                    ...data,
                    username: e.target.value
                })}
                sx={{
                    maxWidth: '450px',
                    marginTop: '10px',
                    width: '100%',
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <AlternateEmail/>
                    </InputAdornment>
                }
            />

            <Typography
                variant="h5"
                fontFamily=""
                sx={{
                    marginTop: '10px',
                    fontSize: '15px',
                    fontHeight: 'bold',
                    fontWeight: 600,
                    color: 'rgb(102,102,102)'
                }}
            >
                {data.username ? yourName : null}
            </Typography>
        </Box>
    )
}