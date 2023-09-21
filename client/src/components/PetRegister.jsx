import React, { useState } from 'react';
import '../App.css';

const PetRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        gender: '',
    });
    const [previewURL, setPreviewURL] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            photo: file,
        }));

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewURL(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewURL(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const petFormData = new FormData();
            petFormData.append('name', formData.name);
            petFormData.append('breed', formData.breed);
            petFormData.append('gender', formData.gender);
            petFormData.append('photo', formData.photo);

            const token = localStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`,
            }

            const response = await fetch('/api/pets', {
                method: 'POST',
                headers: headers,
                body: petFormData,
            });

            if(response.ok){
                console.log('Pet registered successfully');
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
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        required
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
