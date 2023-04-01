import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BookContext } from '../contexts/BookContext';

const BookDetail = () => {
  const { handleEdit, handleDelete } = useContext(BookContext);

  const { id } = useParams();

  const [book, setBook] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setBook({ ...res.data.book });
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }, []);

  return (
    <>
      <Navbar />
      <p className="text-3xl text-center font-bold text-black mt-10 mb-10 pb-6 border-b-4 border-[#FF4C29] w-56 mx-auto">
        Book Detail
      </p>
      <div
        id="card-detail"
        className="flex flex-col items-center p-5 mb-12 min-w-fit mx-auto bg-white rounded border shadow-md md:flex-row md:max-w-md hover:bg-gray-10"
      >
        <img
          className="object-cover w-100 h-96 max-w-md mr-4"
          src={`http://localhost:8000/${book.image}`}
          alt="Book Image"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="text-2xl font-bold tracking-tight text-indigo-900">
            {book.title}
          </h5>
          <p className="mb-4 text-sm text-[#FF4C29]">{book.author}</p>
          {/* <p className="mb-5 text-normal font-semibold text-gray-700">{book.pages}</p> */}
          <p className="text-sm text-gray-700">Publisher:</p>
          <p className="mb-3 text-sm text-gray-400 text-justify">
            {book.publisher}
          </p>
          <p className="text-sm text-gray-700">Year:</p>
          <p className="mb-3 text-sm text-gray-400 text-justify">{book.year}</p>
          <p className="text-sm text-gray-700">Pages:</p>
          <p className="mb-10 text-sm text-gray-400 text-justify">
            {book.pages}
          </p>
          {localStorage.getItem('token') && (
            <div>
              <Link to={`/books/edit/${book.id}`}>
                <button
                  value={book.id}
                  onClick={(event) => {
                    const id = parseInt(event.target.value);
                    handleEdit(id);
                  }}
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-yellow-400 rounded-md hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mr-1"
                >
                  Edit
                </button>
              </Link>
              <button
                value={book.id}
                onClick={(event) => {
                  const id = parseInt(event.target.value);
                  handleDelete(id);
                }}
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookDetail;
