import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <Link to="/signup">Sign Up</Link>
            <h1>Welcome to the Home Page</h1>
        </div>
    )
}