import Navbar from '../components/Navbar';

const Landing = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default Landing;
