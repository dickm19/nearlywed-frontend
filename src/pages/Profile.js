import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../assets/defaultProfile.png';

function Profile(props) {
    const navigate = useNavigate();
    const { user, handleUserUpdate } = props;
    const [profilePicture, setProfilePicture] = useState(image);
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { register, handleSubmit } = useForm({
        values: {
            email: user.email || email,
            first_name: user.first_name || firstName,
            last_name: user.last_name || lastName
        }
    });

    useEffect(() => {
        setProfilePicture(user.avatar_url || image);
        setEmail(user.email || '');
        setFirstName(user.first_name || '');
        setLastName(user.last_name || '');
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

    const onSubmit = (data) => {
        const { email, first_name: firstName, last_name: lastName } = data;
        const updatedUser = { email, first_name: firstName, last_name: lastName };

        axios.patch(`http://localhost:3001/users/${user.id}`, { user: updatedUser }, { withCredentials: true })
            .then(response => {
                setEditMode(false);
                handleUserUpdate({ user: response.data });
                setEmail(response.data.email);
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
            })
            .catch(error => console.log('Error updating profile:', error));
    }


    const handleLogout = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(() => {
            props.handleLogout()
            navigate('/')
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="profile">
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
            <div className="profile-info">
                {editMode ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group"></div>
                            <label htmlFor='email'>Email</label>
                            <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })}/>
                        <div/>
                        <div className="form-group"></div>
                            <label htmlFor='first_name'>First Name</label>
                            <input {...register('first_name')} />
                        <div/>
                        <div className="form-group"></div>
                            <label htmlFor='last_name'>Last Name</label>
                            <input {...register('last_name')}/>
                        <div/>
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <>
                        <button className="edit-profile-button" onClick={() => setEditMode(true)}>Edit Profile</button>
                        <p>Email: {email}</p>
                        <p>Name: {`${firstName} ${lastName}`}</p>
                    </>
                )}
            </div>
            <Link to="/logout" className="logout-link">
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </Link>
        </div>
    );
}

export default Profile;