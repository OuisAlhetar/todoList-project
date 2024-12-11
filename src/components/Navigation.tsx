// components/Navigation.js
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-evenly items-center mb-5 bg-cyan-500 w-full py-2">
      <Link to="/home" className="p-2 rounded-3xl text-black">Home</Link>
      <Link to="/about" className="p-2 rounded-3xl text-black">About</Link>
      <Link to="/contact" className="p-2 rounded-3xl text-black">Contact</Link>
      <Link to="/posts" className="p-2 rounded-3xl text-black">Post</Link>
    </nav>
  );
};

export default Navigation;
