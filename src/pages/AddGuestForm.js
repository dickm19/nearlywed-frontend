import { useState } from "react";

function AddGuestForm() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [guestName, setGuestName] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmail(value);
        if (name === 'guestName') setGuestName(value);
        if (name === 'phoneNumber') setPhoneNumber(value)
    }

    const handleSubmit = (event) => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
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