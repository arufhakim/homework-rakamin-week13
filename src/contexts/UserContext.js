import axios from 'axios';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  // handleSubmit register
  const handleRegister = (input) => {
    const { name, email, password } = input;
    axios
      .post('http://localhost:8000/register', { name, email, password })
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully registered!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // handleSubmit login
  const handleLogin = (input) => {
    const { email, password } = input;
    axios
      .post('http://localhost:8000/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully login!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const values = { handleRegister, handleLogin };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
