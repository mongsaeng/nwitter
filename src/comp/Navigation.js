import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul className="nweetNav">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size="2x" />
          </Link>
        </li>
        <li>
          <Link to="/Profile" className="userLink">
            <FontAwesomeIcon icon={faUser} color={"#04aaff"} size="2x" />
            <span>{userObj.displayName}의 Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
