import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [currentId, setCurrentId] = useState(-1);

  const [input, setInput] = useState({
    title: '',
    author: '',
    publisher: '',
    year: 0,
    pages: 0,
  });

  const fetchBooks = () => {
    axios
      .get('http://localhost:8000/books')
      .then((res) => {
        setBooks([...res.data.books]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBookById = (id) => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setBook({ ...res.data.book });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setCurrentId(id);
        setInput({ ...res.data.book });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (ids) => {
    const id = parseInt(ids);
    axios
      .delete(`http://localhost:8000/books/${id}`, { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((res) => {
        alert('Succesfully delete book!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        headers: { authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        alert('Succesfully add book!');
        navigate('/');
      })
      .catch((error) => {
        console.log(localStorage.getItem('token'));

        console.log(error);
      });
  };

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
      .then((res) => {
        alert('Succesfully update book!');
        navigate('/');
      })
      .catch((error) => {
        console.log(localStorage.getItem('token'));

        console.log(error);
      });
  };

  const values = {
    currentId,
    setCurrentId,
    input,
    setInput,
    book,
    books,
    fetchBooks,
    fetchBookById,
    handleEdit,
    handleUpdate,
    handleCreate,
    handleDelete,
  };
  return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
};
