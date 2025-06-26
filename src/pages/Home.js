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
                            <p>Hello! As a nearlywed, you can create and manage your wedding registry, invite guests, and much more!</p>
                            <WeddingCreation user={user} />
                        </div>
                    ) : (
                        <p>Hello! As a guest, you can browse wedding registries, purchase gifts, and rsvp for events.</p>
                    )}
                </>
            ) : (
                <p>Please log in or sign up to continue.</p>
            )}
        </div>
    );
}

export default Home;