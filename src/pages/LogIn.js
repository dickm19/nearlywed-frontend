import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            errors: ''
        };
    }
    
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
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
                {this.state.errors.map(error => {
                return <li key={error}>{error}</li>
                })}
            </ul>
        </div>
        )
    }

    render() {
        const {email, password} = this.state

        return (
            <div className="login">
                {this.props.loggedInStatus ? <Navigate to="/" /> : <h1>Log In</h1>}
                <form onSubmit={this.handleSubmit}>
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
                    <button type="submit">Log In</button>
                    <div className="form-group">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
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