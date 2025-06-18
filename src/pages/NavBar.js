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
                                    <Link to="/profile" className="profile-link">
                                        <img src={props.user.avatar_url || defaultAvatar} alt="User Avatar" className="avatar-small" />
                                        <p>Profile</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Popup trigger={<button className="button"><FontAwesomeIcon icon={faBars} /></button>}>
                                    <LogIn
                                        handleLogin={props.handleLogin}
                                        loggedInStatus={props.isLoggedIn}
                                    />
                                </Popup>
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