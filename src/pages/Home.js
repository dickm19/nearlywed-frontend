import Popup from 'reactjs-popup';
import WeddingCreation from './WeddingCreation';
import 'reactjs-popup/dist/index.css';

function Home({ loggedInStatus, user }) {
    return (
        <div className="home">
            <h1>Welcome to NearlyWed!</h1>
            { loggedInStatus && user ? (
                <>
                    { user.role === 'nearlywed' ? (
                        <>
                            <p>Hello! As a nearlywed, you can create and manage your wedding registry, invite guests, and much more!</p>
                            <Popup trigger={<button className="button"> Get Started </button>} position="bottom center">
                                <WeddingCreation user={user} />
                            </Popup>
                        </>
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