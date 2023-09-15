import React, { useState } from 'react';
import '../App.css';

const PetRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            photo: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <form className="pet-register-form" onSubmit={handleSubmit}>
            <section className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </section>

            <section className="form-group">
                <label>Breed:</label>
                <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />
            </section>
            <section className='pet-form'>
                <section id="pet-gender">
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </section>
                <section id="pet-photo">
                    <label>Add Photo:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        required
                    />
                </section>
                <section id="pet-submit">
                    <button type="submit">Register Pet</button>
                </section>
            </section>
        </form>
    );
};

export default PetRegistrationForm;
