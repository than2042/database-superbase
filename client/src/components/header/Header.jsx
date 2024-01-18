import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="linkContainer">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/post">Posts</Link>
        <Link to="/add-post">Add Posts</Link>
        <Link to="/user">User</Link>
      </div>
    </div>
  );
};

export default Header;
