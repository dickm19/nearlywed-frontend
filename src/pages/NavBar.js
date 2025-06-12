import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Layout(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(() => {
            props.handleLogout()
            navigate('/')
        })
        .catch(error => console.log(error))
    }
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        props.loggedInStatus ? (
                            <>
                                <li>
                                    <Link to="/profile" className="profile-link">
                                        <img src={props.user.avatar_url} alt="User Avatar" className="avatar-small" />
                                        <p>Profile</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;