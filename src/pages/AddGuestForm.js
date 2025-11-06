import { useState } from "react";

function AddGuestForm() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
        if (name === 'phoneNumber') setPhoneNumber(value)
    }

    const handleSubmit = (event) => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="first-name">First Name:</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        value={firstName}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name:</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        value={lastName}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="phone-number">Phone Number</label>
                    <input
                        type="text"
                        id="phone-number"
                        mame="phone-number"
                        value={phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            
            <button type="submit">Add Guest</button>
        </form>
    )
}

export default AddGuestForm