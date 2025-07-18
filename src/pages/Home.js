import WeddingCreation from './WeddingCreation';
import 'reactjs-popup/dist/index.css';
import '../styles/Home.scss';

function Home({ loggedInStatus, user }) {
    return (
        <div className="home">
            <h1>Welcome to NearlyWed!</h1>
            { loggedInStatus && user ? (
                <>
                    { user.role === 'nearlywed' ? (
                        <div className='nearlywed-home'>
                            <WeddingCreation user={user} />
                        </div>
                    ) : (
                        <div className='guest-home'>
                            <p>Hello! As a guest, you can browse wedding registries, purchase gifts, and rsvp for events.</p>
                        </div>
                    )}
                </>
            ) : (
                <p>Please log in or sign up to continue.</p>
            )}
        </div>
    );
}

export default Home;