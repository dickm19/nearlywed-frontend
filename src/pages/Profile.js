import { Component } from 'react';
import axios from 'axios';
import image from '../assets/defaultProfile.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: props.user.profile_picture_url || image
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            profilePicture: nextProps.user.profile_picture_url || image
        });
    }


    handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const formData = { user: { profile_picture_url: imageUrl } };

            axios.patch(`http://localhost:3001/users/${this.props.user.id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.setState({ profilePicture: response.data.user.profile_picture_url });
            })
            .catch(error => console.log('Error uploading image:', error));
        }
    }

    render() {
        return (
            <div className="profile">
                <h1>Profile Page</h1>
                <div className="profile-image-section">
                    <img
                        className="profile-picture"
                        src={this.state.profilePicture}
                        alt="Profile"
                    />
                    <label htmlFor="image-upload" className="image-upload-label">
                        Update Profile Photo
                    </label>
                    <input type="file" accept="image/*" onChange={this.handleImageChange} />
                </div>
                <p>Email: {this.props.user.email}</p>
                
            </div>
        );
    }
}

export default Profile;