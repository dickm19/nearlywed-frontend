import '../styles/WeddingCreation.scss';
import EmailInput from './Fields/EmailInput';

function WeddingCreation({ user }) {
    return (
        <div className="wedding-creation">
            <h3>Create your Registry</h3>
            <p>this feature is incomplete</p>
            <h3>Invite Guests</h3>
                <EmailInput submitText="Invite Guests"/>
            <h3>Manage Wedding Details</h3>
            <p>this feature is incomplete</p>
        </div>
    )
}

export default WeddingCreation;
