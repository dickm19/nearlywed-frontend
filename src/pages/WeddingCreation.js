import { useState } from 'react';
import '../styles/WeddingCreation.scss';

function WeddingCreation({ user }) {
    const [emails, setEmails] = useState([]);
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

    const handleEmailSubmmit = (event) => {
        event.preventDefault();
        console.log('Submitted emails:', emails);
    }

    return (
        <div className="wedding-creation">
            <h3>Create your Registry</h3>
                <p>this feature is incomplete</p>
            <h3>Invite Guests</h3>
                <form onSubmit={handleEmailSubmmit}>
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
                </form>
            <h3>Manage Wedding Details</h3>
        </div>
    )
}

export default WeddingCreation;
