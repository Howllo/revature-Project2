import { Box, Grid2 } from '@mui/material';
import RightSidebar from "../component/RightSidebar/RightSidebar.jsx";
import {AuthBarHandle} from "../component/Navbar/AuthBarHandle.jsx";
import FAB_ScrollReset from "../component/LeftSidebar/AuthContainer/FAB_ScrollReset.jsx";
import {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

function HomePage({children}) {
    const [showFAB, setShowFAB] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight } = containerRef.current;
                const scrollThreshold = scrollHeight * 0.15;
                setShowFAB(scrollTop > scrollThreshold);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollUp = () => {
        containerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <Box
            sx={{
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: 'white',
            }}
        >
            <Grid2
                container
                sx={{
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '2fr 3fr 2fr',
                    gap: '20px',
                    padding: '20px',
                    boxSizing: 'border-box',
                }}
            >
                <Grid2
                    sx={{
                        height: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <AuthBarHandle />
                    { showFAB && <FAB_ScrollReset handleScrollUp={handleScrollUp}/> }
                </Grid2>
                <Grid2
                    ref={containerRef}
                    sx={{
                        maxWidth: '90%',
                        minWidth: '90%',
                        height: '100%',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingRight: '8px'
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: 'column',
                            display: 'flex',
                            justifyContent: 'top',
                            alignItems: 'center',
                        }}
                    >
                        {/* Main content */}
                        {children}
                    </Box>
                </Grid2>
                <Grid2
                    sx={{
                        height: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <RightSidebar />
                </Grid2>
            </Grid2>
        </Box>
    );
}

HomePage.propTypes = {
    children: PropTypes.node,
};

export default HomePage;