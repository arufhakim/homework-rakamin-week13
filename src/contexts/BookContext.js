import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [currentId, setCurrentId] = useState(-1);
  const [input, setInput] = useState({
    title: '',
    author: '',
    publisher: '',
    year: 0,
    pages: 0,
  });

  // handleCreate book
  const handleCreate = (input) => {
    const { title, author, publisher, year, pages, file } = input;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('year', year);
    formData.append('pages', pages);
    formData.append('image', file);

    axios
      .post('http://localhost:8000/books', formData, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('Succesfully add book!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  // handleEdit book
  const handleEdit = (id) => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setInput({ ...res.data.book });
        setCurrentId(id);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  //handleUpdate
  const handleUpdate = (id, input) => {
    const { title, author, publisher, year, pages } = input;

    const intYear = parseInt(year);
    const intPages = parseInt(pages);

    axios
      .put(
        `http://localhost:8000/books/${id}`,
        { title, author, publisher, year: intYear, pages: intPages },
        {
          headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      )
      .then(() => {
        alert('Succesfully update book!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  // handleDelete book
  const handleDelete = (id) => {
    const bookId = parseInt(id);

    axios
      .delete(`http://localhost:8000/books/${bookId}`, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .then(() => {
        alert('Succesfully delete book!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const values = {
    books,
    setBooks,
    currentId,
    setCurrentId,
    input,
    setInput,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
  };

  return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
};
