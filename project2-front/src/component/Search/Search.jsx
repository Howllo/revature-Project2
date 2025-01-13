import {Box, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import SearchResultContainer from "./SearchResultContainer.jsx";
import SearchResult from "./SearchResult.jsx";
import {projectApi} from "../../util/axios.js";

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);

    const searchUsername = async (username) => {
        if(username === undefined) {
            return [];
        }

        try {
            const response = await projectApi.get(`/search/user/${username}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            return response.data || [];
        } catch (e) {
            console.error('Error getting search results for user: ', e.status);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handleClear = () => {
        setSearchTerm('')
    }

    useEffect(() => {
        const checkUsernameDebounced = setTimeout(async () => {
            if (searchTerm && searchTerm.length >= 1) {
                const results = await searchUsername(searchTerm.toLowerCase());
                setSearchResults(results || []);
            }
        }, 100);

        return () => clearTimeout(checkUsernameDebounced);
    }, [searchTerm]);

    return (
        <Box sx={{
            minHeight: '100vh',
            width: '100%',
            marginLeft: '15px',
        }}>
            <Box
                sx={{
                    width: '100%',
                    alignItems: 'left',
                }}
            >
                <OutlinedInput
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            color: 'hsl(211, 20%, 53%)',
                            opacity: 1
                        },
                        backgroundColor: 'rgb(241, 243, 245)',
                        height: '43px',
                        width: '100%',
                        borderColor: 'none'
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search"
                    onChange={(e)=>handleSubmit(e)}
                    value={searchTerm}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="clear text"
                                onClick={handleClear}
                                edge="end"
                                size="small"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {
                                    searchTerm !== '' ? <CancelIcon /> : null
                                }
                            </IconButton>
                        </InputAdornment>
                    }
                />

                {
                    searchTerm.length > 0 ? <SearchResultContainer searchWord={searchTerm} children =
                        {
                            searchResults.map((result) => (
                                <SearchResult key={result.id} user={result} setSearchTerm={setSearchTerm}/>
                            ))      
                        }/> : null
                }
            </Box>
        </Box>
    )
}

export default Search