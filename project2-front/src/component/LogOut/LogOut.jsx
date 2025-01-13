import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { Button, Typography } from "@mui/material"
import useNav from "../Navbar/NavContext/UseNav";
 
const LogOut = () => {
    const {currentNav} = useNav();
    let navigate  = useNavigate();

    const handleLogoutClick = () => {
            Cookies.remove('jwt')
            Cookies.remove('username')
            navigate('/');
            window.location.reload(true)
        }

    return(
        <Link to={'/'}>
                <Button onClick={handleLogoutClick} variant="contained" sx={{
                    marginTop: '10px',
                }}>Log Out</Button>
        </Link>
    )

}
export default LogOut
            
            