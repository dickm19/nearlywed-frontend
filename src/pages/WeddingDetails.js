import { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function WeddingDetails({ wedding }) {
    const { couple_names, id, date } = wedding
    const [coupleNames, setCoupleNames] = useState(couple_names || "");
    const [weddingDate, setWeddingDate] = useState(date || new Date());

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'couple-names') setCoupleNames(value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = { wedding: {
            couple_names: coupleNames,
            date: weddingDate,
        }}
        axios.patch(
            `http://localhost:3001/weddings/${id}`,
            formData,
            { withCredentials: true }
        )
        .then((response) => {
            setWeddingDate(response.data.date)
            setCoupleNames(response.data.couple_names)
        })
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
                <DatePicker
                    selected={weddingDate}
                    onChange={(date) => setWeddingDate(date)}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default WeddingDetails;