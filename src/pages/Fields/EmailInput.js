import { useState } from 'react';

function EmailInput({ submitText }) {
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
        <div class="email-input">
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
                    <button type="submit">{submitText}</button>
                </form>
        </div>
    )
}

export default EmailInput