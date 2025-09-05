import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.scss';

function LogIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState('');
    const [signUp, setSignUp] = useState(true)

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'password_confirmation') setPasswordConfirmation(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = { email, password };
        let url = ""
        if (signUp) {
            user.password_confirmation = passwordConfirmation;
            url = "http://localhost:3001/users"
        } else {
            url = "http://localhost:3001/login"
        }
        axios.post(url, { user }, { withCredentials: true })
            .then(response => {
                if (response.data) {
                    props.handleLogin(response.data);
                } else {
                    setErrors(response.data.errors);
                }
            })
            .catch(error => console.log('api errors:', error));
    }

    const handleErrors = () => (
        <div>
            <ul>
                {Array.isArray(errors) && errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="signup">
            {props.loggedInStatus ? <Navigate to="/" /> : <h1>{signUp ? "Sign Up" : "Log In"}</h1>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        required
                        onChange={handleChange}
                    />
                </div>
                {signUp ? (
                    <>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Confirm Password:</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={passwordConfirmation}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                        <div className="form-group">
                            <p>Already have an account? <button onClick={() => setSignUp(false)}>Log In</button></p>
                        </div>
                    </>
                ) : (
                    <>
                        <button type="submit">Log In</button>
                        <div className="form-group">
                            <p>Don't have an account? <button onClick={() => setSignUp(true)}>Sign Up</button></p>
                        </div>
                    </>
                )}
            </form>
            <div>
                {errors ? handleErrors() : null}
            </div>
        </div>
    );
}

export default LogIn;