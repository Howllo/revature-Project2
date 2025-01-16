import {Box, Paper, Typography} from "@mui/material";
import {HorizontalRule} from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const SearchResultContainer = ({key, searchWord, children}) => {
    return (
        <Paper
            elevation={2}
            key={key}
            sx={{
                height: 'fit-content',
                width: '92%',
                maxWidth: '92%',
                borderRadius: 2,
                padding: 1.25,
                transition: 'all 0.3s ease',
                marginTop: 1,
                marginRight: 10,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'rgb(197, 207, 217)',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                      color: 'black',
                      fontSize: '14px',
                      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                      fontWeight: 600,
                      width: '100%',
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                    }}
                >
                    Search for &#34;{searchWord}&#34;
                </Typography>

                <HorizontalRule
                    sx={{
                        marginTop: '10px',
                        mx: -1.25,
                        color: 'rgb(212,217,225)',
                        width: '109%',
                        height: '1.1px',
                        backgroundColor: 'rgb(212,217,225)',
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}
            >
                {children}
            </Box>
        </Paper>
    );
};

export default SearchResultContainer;