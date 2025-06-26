import '../styles/WeddingCreation.scss';
import EmailInput from './Fields/EmailInput';
import { Link } from 'react-router-dom';
import { useState } from 'react'

function WeddingCreation({ user }) {
    const [selected, setSelected] = useState('home');

    const handleClick = (event) => {
        setSelected(event);
    }

    const handleGuestInvite = (guests) => {
        console.log(guests)
    }

    return (
        <div className="wedding-creation">
            <nav>
                <ul>
                    <li>
                        <Link to="#" onClick={() => handleClick('home')}>Home</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleClick('registry')}>Create your Registry</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleClick('guests')}>Invite/Manage Guests</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleClick('details')}>Manage Wedding Details</Link>
                    </li>
                </ul>
            </nav>
            { selected === 'home' ? <p>Home test</p> : null }
            { selected === 'registry' ? <p>Registry test</p> : null}
            { selected === 'guests' ? <EmailInput submitText="Invite Guests" submitHandler={handleGuestInvite}/> : null }
            { selected === 'details' ? <p>Details test</p> : null }
        </div>
    )
}

export default WeddingCreation;
