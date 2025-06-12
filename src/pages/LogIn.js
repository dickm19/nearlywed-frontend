import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            password_confirmation: '',
            errors: ''
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    };

    handleSignUp = (event) => {
        event.preventDefault();
        const {email, password, password_confirmation} = this.state;
        let user = {
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
        axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
            .then(response => {
                if (response.data.status === 'created') {
                    this.props.handleLogin(response.data)
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('api errors:', error))
    };

    handleLogin = (event) => {
        event.preventDefault()
        const {email, password} = this.state;
        let user = {
            email: email,
            password: password
        }
        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
        if (response.data.logged_in) {
            this.props.handleLogin(response.data)
        } else {
            this.setState({
                errors: response.data.errors
            })
        }
        })
        .catch(error => console.log('api errors:', error))
    }

    handleErrors = () => {
        return (
        <div>
            <ul>
                {this.state.errors.map((error) => {
                    return <li key={error}>{error}</li>
                })}
            </ul> 
        </div>
        )
    }
    render() {
        const {email, password, password_confirmation} = this.state

        return (
            <div className="signup">
                {this.props.loggedInStatus ? <Navigate to="/" /> : <h1>Sign Up</h1>}
                <form onSubmit={this.props.signUp ? this.handleSignUp : this.handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            required
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
                        />
                    </div>
                    { 
                        this.props.signUp ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="password_confirmation">Confirm Password:</label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={password_confirmation}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button type="submit">Sign Up</button>
                                <div className="form-group">
                                    <p>Already have an account? <Link to='/login'>Log In</Link></p>
                                </div>
                            </>
                        ) : (
                            <>
                                <button type="submit">Log In</button>
                                <div className="form-group">
                                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                                </div>
                            </>
                        )
                    }
                    
                </form>
                <div>
                    {
                        this.state.errors ? this.handleErrors() : null
                    }
                </div>
            </div>
        );
    }
}
export default LogIn;