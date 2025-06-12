import { Outlet, Link } from "react-router-dom";

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
                                        <img src={props.user.avatar_url} alt="User Avatar" className="avatar-small" />
                                        <p>Profile</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/signup"><p>Sign Up</p></Link>
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