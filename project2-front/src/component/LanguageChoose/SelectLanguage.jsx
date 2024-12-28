import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";
import {Box} from "@mui/material";
export default function SelectLanguage() {
    const [language, setLanguage] = useState(navigator.language)

    return (
        <Box
            sx={{
                mx: '-10px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'left',
                width: 'auto',
            }}
        >
            <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                    variant='outlined'
                    onChange={(e) => setLanguage(e.target.value)}
                    defaultValue={language}
                    sx = {{
                        height: '30px',
                        display: 'flex',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgb(66, 87, 108)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                >
                    <MenuItem value={'en-US'}>English (US)</MenuItem>
                    <MenuItem value={'en-GB'}>English (UK)</MenuItem>
                    <MenuItem value={'zh'}>中文 – Chinese</MenuItem>
                    <MenuItem value={'hi'}>हिन्दी – Hindi</MenuItem>
                    <MenuItem value={'es'}>Español – Spanish</MenuItem>
                    <MenuItem value={'ar'}>العربية – Arabic</MenuItem>
                    <MenuItem value={'bn'}>বাংলা – Bengali</MenuItem>
                    <MenuItem value={'pt'}>Português – Portuguese</MenuItem>
                    <MenuItem value={'ru'}>Русский – Russian</MenuItem>
                    <MenuItem value={'ja'}>日本語 – Japanese</MenuItem>
                    <MenuItem value={'fr'}>Français – French</MenuItem>
                    <MenuItem value={'de'}>Deutsch – German</MenuItem>
                    <MenuItem value={'ko'}>한국어 – Korean</MenuItem>
                    <MenuItem value={'tr'}>Türkçe – Turkish</MenuItem>
                    <MenuItem value={'it'}>Italiano – Italian</MenuItem>
                    <MenuItem value={'th'}>ไทย – Thai</MenuItem>
                    <MenuItem value={'vi'}>Tiếng Việt – Vietnamese</MenuItem>
                    <MenuItem value={'fa'}>فارسی – Persian</MenuItem>
                    <MenuItem value={'pl'}>Polski – Polish</MenuItem>
                    <MenuItem value={'uk'}>Українська – Ukrainian</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}