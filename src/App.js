import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import BookDetail from './pages/BookDetail';
import { useEffect, useState } from 'react';

function App() {
  const PrivateRoute = ({ children, ...rest }) => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuth(true);
      } else {
        navigate('/login');
      }
    }, []);

    return <> {isAuth ? children : ''}</>;
  };

  const AuthRoute = ({ children, ...rest }) => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/');
      }
    }, []);

    return <> {!isAuth ? children : ''}</>;
  };

  return (
    <Router>
      <UserProvider>
        <BookProvider>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route
              path="/books/create"
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/books/edit/:id"
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              }
            />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
          </Routes>
        </BookProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
