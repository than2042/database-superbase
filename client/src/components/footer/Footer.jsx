import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p className="footerText">@thanthan2024</p>
      <Link to="https://en-gb.facebook.com/">
        <FontAwesomeIcon icon={faFacebook} />
      </Link>
      <Link to="https://www.instagram.com/">
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
    </div>
  );
};

export default Footer;
