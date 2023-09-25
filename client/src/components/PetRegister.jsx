import React, { useState } from 'react';
import '../App.css';

const PetRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        gender: '',
        photo: '',
    });
    const [previewURL, setPreviewURL] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const petFormData = {
                name: formData.name,
                breed: formData.breed,
                gender: formData.gender,
                photo: formData.photo
            };

            const token = localStorage.getItem("token");

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
           
            const response = await fetch('/api/pets', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(petFormData),
            });
            const data = await response.json()
            console.log(data);
            if(response.ok){
                alert('Pet registered successfully');
            } else {
                console.error('Error registering pet');
            }
        } catch (error) {
            console.error('Error registering pet: ', error);
        }
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
                    <label id='pet-label'>Add Photo:</label>
                    <input 
                        id='pet-input-box'
                        type='text'
                        name="photo"
                        onChange={handleChange}
                    />
                    {previewURL && <img src={previewURL} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                </section>

                <section >
                    <button id="pet-submit" type="submit">Register Pet</button>
                </section>
            </section>
        </form>
    );
};

export default PetRegistrationForm;
