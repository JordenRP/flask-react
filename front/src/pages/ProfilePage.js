import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserProfile = async (email) => {
      try {
        const response = await fetch(`http://localhost:5000/get_user?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setEmail(userData.email);
          setFirstName(userData.first_name || '');
          setLastName(userData.last_name || '');
          setPhoneNumber(userData.phone_number || '');
        } else {
          alert('Failed to load user profile');
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/auth');
      }
    };

    const email = localStorage.getItem('email');
    if (email) {
      fetchUserProfile(email);
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/edit_profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, first_name: firstName, last_name: lastName, phone_number: phoneNumber }),
      });

      if (response.ok) {
        const updatedUser = { email, first_name: firstName, last_name: lastName, phone_number: phoneNumber };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile updated successfully');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h1>Your Profile</h1>
      {user && (
        <div>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled
          />
          <TextInput
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
          <TextInput
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
          <TextInput
            label="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          <Button text="Save" onClick={handleSave} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
