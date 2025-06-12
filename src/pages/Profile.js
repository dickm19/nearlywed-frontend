import { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../assets/defaultProfile.png';

function Profile({ user }) {
    const [profilePicture, setProfilePicture] = useState(user.avatar_url || image);

    useEffect(() => {
        setProfilePicture(user.avatar_url || image);
    }, [user]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('user[avatar]', file);

            axios.patch(`http://localhost:3001/users/${user.id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setProfilePicture(response.data.avatar_url);
            })
            .catch(error => console.log('Error uploading image:', error));
        }
    };

    return (
        <div className="profile">
            <h1>Profile Page</h1>
            <div className="profile-image-section">
                <img
                    className="profile-picture"
                    src={profilePicture}
                    alt="Profile"
                />
                <label htmlFor="image-upload" className="image-upload-label">
                    Update Profile Photo
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Profile;