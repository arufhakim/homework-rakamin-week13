import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import Landing from '../layouts/Landing';

const BookAdd = () => {
  const { input, setInput, handleCreate, currentId, setCurrentId, handleUpdate } = useContext(BookContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const [file, setFile] = useState(null);

  return (
    <Landing>
      <div className="mx-10 mt-10 mb-12 basis-4/5">
        <p className="text-3xl text-center font-bold text-black mb-6 pb-6 border-b-4 border-indigo-700 w-48 mx-auto">Book Form</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (currentId === -1) {
              handleCreate({ ...input, file });
            } else {
              handleUpdate(currentId, { ...input });
            }
            setInput({
              title: '',
              author: '',
              publisher: '',
              year: 0,
              pages: 0,
            });
            setFile(null);
            setCurrentId(-1);
          }}
        >
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={input.title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={input.author}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="publisher" className="block mb-2 text-sm font-medium text-gray-900">
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={input.publisher}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={input.year}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pages" className="block mb-2 text-sm font-medium text-gray-900">
              Pages
            </label>
            <input
              type="text"
              id="pages"
              name="pages"
              value={input.pages}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {currentId === -1 ? (
            <div className="mb-6">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              {/* <button
              onClick={async () => {
                if (!file) {
                  alert('Pililah');
                  return;
                }

                const formData = new FormData();
                formData.append('image', file);

                try {
                  const res = await axios.post(`http://localhost:8000/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                  });
                } catch (error) {}
              }}
            >
              Upload
            </button> */}
            </div>
          ) : (
            ''
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Landing>
  );
};

export default BookAdd;