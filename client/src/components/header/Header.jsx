import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      {/* <img className="logo" src="./images/logo.svg" alt="logo" /> */}
      <div className="linkContainer">
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link> */}
        <Link to="/posts">Posts</Link>
        <Link to="/add-post">Create Posts</Link>
      </div>
      <div className="icon">
        <Link to="/user">
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
