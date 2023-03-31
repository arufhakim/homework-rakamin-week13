import axios from 'axios';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // redirect
  const navigate = useNavigate();

  // handleSubmit register
  const handleRegister = (input) => {
    const { name, email, password } = input;
    axios
      .post('http://localhost:8000/register', { name, email, password })
      .then((res) => {
        alert('Successfully registered!');
        navigate('/login');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  // handleSubmit login
  const handleLogin = (input) => {
    const { email, password } = input;
    axios
      .post('http://localhost:8000/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        alert('Successfully login!');
        navigate('/');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const values = { handleRegister, handleLogin };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
