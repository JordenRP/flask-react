import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      navigate('/profile')
    }
  })

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('email', email);
        navigate('/profile');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('An unexpected error occurred.');
    }
  };

  const handleRegister = async ({ email, password, firstName, lastName }) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('email', email);
        navigate('/profile');
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
      <h1>Welcome</h1>
      <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};

export default AuthPage;
