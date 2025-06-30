import { useState } from 'react';
import axios from 'axios';

function EmailInput({ submitText, wedding }) {
    const [emails, setEmails] = useState(wedding.guest_emails || []);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (['Enter', ','].includes(e.key)) {
            e.preventDefault();
            const value = inputValue.trim();
            if (value && isValidEmail(value)) {
                setEmails((prev) => [...prev, value]);
                setInputValue('');
            }
        }
    }
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleDelete = (emailToDelete) => {
        setEmails(emails.filter((email) => email !== emailToDelete));
    };

    const handleEmailSubmit = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:3001/weddings/${wedding.id}`, { wedding: { guest_emails: emails } }, {
                withCredentials: true,
            })
            .then((response) => {
                setEmails(response.data.guest_emails);
            })
            .catch(error => console.log('Error adding guests:', error));
    }

    

    return (
        <div className="email-input">
            <form onSubmit={handleEmailSubmit}>
                    <div className="input-pills" onClick={() => document.getElementById('email-input')?.focus()}>
                        {emails.map((email, index) => (
                            <span key={index} className="pill">
                                {email}
                                <button className="delete-btn" onClick={() => handleDelete(email)}>×</button>
                            </span>
                        ))}
                        <input
                            id="email-input"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={emails.length === 0 ? "Enter email..." : ""}
                        />
                    </div>
                    <button type="submit">{submitText}</button>
                </form>
        </div>
    )
}

export default EmailInput