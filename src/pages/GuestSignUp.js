import { useState } from 'react';
import axios from 'axios';
import Select from "react-dropdown-select";

function GuestSignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState('');
    const [guestName, setGuestName] = useState('');
    const [rsvp, setRsvp] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'password_confirmation') setPasswordConfirmation(value);
        else if (name === 'full-name') setGuestName(value);
        else if (name === 'rsvp') setRsvp(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = { email, password, password_confirmation: passwordConfirmation, full_name: guestName, rsvp  };
        axios.post("http://localhost:3001/users/guest_signup", { user }, { withCredentials: true })
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
    const rsvpOptions = [
        {
            value: 'Yes',
            label: 'Yes'
        },
        { 
            value: 'No',
            label: 'No'
        },
        {
            value: 'Maybe',
            label: 'Maybe',
        }
    ];

    return (
        <div>
            <h1>Guest Sign Up</h1>
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
                    <label htmlFor="full-name">Full Name:</label>
                    <input
                        type="text"
                        id="full-name"
                        name="full-name"
                        value={guestName}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rsvp">RSVP:</label>
                    <Select
                        options={rsvpOptions}
                        values={[{ value: rsvp }]}
                        onChange={(values) => setRsvp(values[0].value)}
                        placeholder="Select RSVP"
                        labelField="label"
                        valueField="value"
                        searchable={false}
                        name="rsvp"
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
            </form>
            <div>
                {errors ? handleErrors() : null}
            </div>
        </div>
    )
}

export default GuestSignUp;