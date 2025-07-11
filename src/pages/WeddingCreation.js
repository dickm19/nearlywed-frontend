import '../styles/WeddingCreation.scss';
import EmailInput from './Fields/EmailInput';
import Index from './Guests/Index'
import WeddingHome from './WeddingHome'
import WeddingDetails from './WeddingDetails'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

function WeddingCreation({ user }) {
    const [selected, setSelected] = useState('home');
    const [wedding, setWedding] = useState()

    const handleClick = (event) => {
        setSelected(event);
    }

    const getCurrentWedding = () => {
        axios.get(`http://localhost:3001/weddings/${user.wedding_id}`, { withCredentials: true })
            .then((response) => setWedding(response.data))
            .catch(error => console.log('api errors:', error));
    }

    useEffect(() => {
        getCurrentWedding();
        // eslint-disable-next-line
    }, [])

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
            { selected === 'home' ? <WeddingHome/> : null }
            { selected === 'registry' ? <p>Registry test</p> : null}
            { selected === 'guests' ? (
                <>
                    <EmailInput submitText="Invite Guests" wedding={wedding} user={user} />
                    <Index wedding={wedding}/>
                </>
            ) : null }
            { selected === 'details' ? <WeddingDetails wedding={wedding}/> : null }
        </div>
    )
}

export default WeddingCreation;
