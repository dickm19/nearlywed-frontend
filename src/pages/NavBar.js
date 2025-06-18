import { Outlet, Link } from "react-router-dom";
import defaultAvatar from "../assets/defaultProfile.png";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LogIn from './LogIn'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';
import '../styles/NavBar.scss'

function Layout(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
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
                        <Link to="/"><p>Home</p></Link>
                    </li>
                    {
                        props.loggedInStatus ? (
                            <>
                                <li>
                                    <div className="user-menu">
                                        <Popup trigger={<button className="user-menu-button"><FontAwesomeIcon className="dropdown-icon" icon={faBars} /></button>}>
                                            <ul className="user-menu-options">
                                                <li>
                                                    <Link to="/profile" className="profile-link">
                                                        <img src={props.user?.avatar_url || defaultAvatar} alt="User Avatar" className="avatar-small" />
                                                        <p>Profile</p>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/logout" className="logout-link">
                                                        <button onClick={handleLogout} className="logout-button">Logout</button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Popup>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <li>
                                <div className="user-menu">
                                    <Popup trigger={<button className="user-menu-button"><FontAwesomeIcon className="dropdown-icon" icon={faBars} /></button>}>
                                        <LogIn
                                            handleLogin={props.handleLogin}
                                            loggedInStatus={props.isLoggedIn}
                                        />
                                    </Popup>
                                </div>
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