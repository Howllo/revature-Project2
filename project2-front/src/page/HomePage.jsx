import { Box } from '@mui/material';
import RightSidebar from "../component/RightSidebar/RightSidebar.jsx";
import {AuthBarHandle} from "../component/Navbar/AuthBarHandle.jsx";
import {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import './HomePage.css';

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
        <Box className="HomePageContainer">
                <Box className="AuthContainer">
                    <AuthBarHandle handleScrollUp={handleScrollUp} showFAB={showFAB}/>
                </Box>
                <Box className="ChildrenContainer" ref={containerRef}>
                    {/* Main content */}
                    {children}
                </Box>
                <Box className="RightSidebarContainer">
                    <RightSidebar />
                </Box>
        </Box>
    );
}

HomePage.propTypes = {
    children: PropTypes.node,
};

export default HomePage;