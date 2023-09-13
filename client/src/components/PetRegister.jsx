// eslint-disable-next-line no-unused-vars
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </section>

      <section>
        <label>Breed:</label>
        <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
      </section>

      <section>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </section>

      <section>
        <label>Add Photo:</label>
        <input type="file" name="photo" onChange={handleFileChange} required />
      </section>

      <section>
        <button type="submit">Register Pet</button>
      </section>
    </form>
  );
};

export default PetRegistrationForm;
