import { useState } from 'react'
import axios from 'axios'

function WeddingDetails({ wedding }) {
    const { couple_names, id } = wedding
    const [coupleNames, setCoupleNames] = useState(couple_names || "");

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'couple-names') setCoupleNames(value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.patch(
            `http://localhost:3001/weddings/${id}`,
            { wedding: { couple_names: coupleNames } },
            { withCredentials: true }
        )
        .then((response) => setCoupleNames(response.data.couple_names))
        .catch(error => console.log('error updating details: ', error))
    }

    return (
        <div className="wedding-details">
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="couple-names">Couple Names</label>
                <input
                    type="text"
                    id="couple-names"
                    name="couple-names"
                    value={coupleNames}
                    onChange={handleChange}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default WeddingDetails;