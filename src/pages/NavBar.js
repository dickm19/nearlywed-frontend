import { Outlet, Link } from "react-router-dom";
import defaultAvatar from "../assets/defaultProfile.png";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LogIn from './LogIn'

function Layout(props) {
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
                                            <Link to="/profile" className="profile-link">
                                                <img src={props.user.avatar_url || defaultAvatar} alt="User Avatar" className="avatar-small" />
                                                <p>Profile</p>
                                            </Link>
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