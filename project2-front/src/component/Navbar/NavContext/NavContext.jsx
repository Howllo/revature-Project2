import {createContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { projectApi } from "../../../util/axios";
import {useLocation, useNavigate} from "react-router-dom";

const NavContext = createContext(null);

export const NavProvider = ({children}) => {
  const [currentNav, setCurrentNav] = useState('home');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHistory((prevStack) => {
      if (prevStack[prevStack.length - 1] === location.pathname) {
        return prevStack;
      }
      return [...prevStack, location.pathname];
    });
  }, [location]);

  const handleBack = (steps = 1) => {
    if (steps >= history.length) {
      console.warn("Cannot go back further than the beginning of history.");
      return;
    }

    const newHistoryStack = [...history];
    for (let i = 0; i < steps; i++) {
      newHistoryStack.pop();
    }

    const previousPath = newHistoryStack[newHistoryStack.length - 1];
    setHistory(newHistoryStack);
    navigate(previousPath);
  };

    const getUser = async () => {
        const token = Cookies.get('jwt');    
        try {
                const response  = await projectApi.get(`/user/${Cookies.get('user_id')}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const returning = response.data
                return returning;
            } catch (e) {
                console.error('Error getting current user: ', e.status);
            }
        }

    const value = {
      currentNav,
      setCurrentNav,
      getUser,
      history,
      handleBack,
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