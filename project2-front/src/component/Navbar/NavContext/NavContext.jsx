import {createContext, useState} from "react";
import PropTypes from 'prop-types';

const NavContext = createContext(null);

export const NavProvider = ({children}) => {
    const [currentNav, setCurrentNav] = useState('home');

    const value = {
        currentNav,
        setCurrentNav,
    }

    return (
        <NavContext.Provider value={value}>
            {children}
        </NavContext.Provider>
    )
}

NavProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NavContext;