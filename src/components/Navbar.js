import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#082032] p-6 sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Booking Books
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-[#FF4C29] hover:text-white mr-4"
          >
            Book List
          </Link>
          {localStorage.getItem('token') && (
            <Link
              to="/books/create"
              className="block mt-4 lg:inline-block lg:mt-0 text-[#FF4C29] hover:text-white mr-4"
            >
              Add Book
            </Link>
          )}
        </div>
        <div>
          {!localStorage.getItem('token') && (
            <Link
              to="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-[#FF4C29] border-[#FF4C29]  hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          )}
          {localStorage.getItem('token') && (
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location = '/';
              }}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-[#FF4C29] border-[#FF4C29] hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
