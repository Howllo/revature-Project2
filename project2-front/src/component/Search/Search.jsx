import {Box, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import SearchResultContainer from "./SearchResultContainer.jsx";
import SearchResult from "./SearchResult.jsx";
import {projectApi} from "../../util/axios.js";

//TODO: Make the API and states context. There is issue with either:
// * Timing of context initialization
// * Order of provider nesting
// * Potential circular dependencies
// * Race conditions in state updates
function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);

    const searchUsername = async (username) => {
        if(username === undefined) {
            console.log(`This username was: ${username}`);
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
            if (searchTerm && searchTerm.length >= 3) {
                const results = await searchUsername(searchTerm);
                setSearchResults(results || []);
            }
        }, 500);

        return () => clearTimeout(checkUsernameDebounced);
    }, [searchTerm]);

    return (
        <Box sx={{
            minHeight: '100vh',
            maxWidth: '250px',
            width: 'auto',
            margin: 0,
            padding: 0
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