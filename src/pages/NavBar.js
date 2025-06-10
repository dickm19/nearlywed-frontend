import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Layout(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
            props.handleLogout()
            navigate('/')
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        props.loggedInStatus ? (
                            <li>
                                <Link to="/logout" onClick={handleClick}>Log Out</Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                                <li>
                                    <Link to="/login">Log In</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;