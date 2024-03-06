import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, server } from "./contexts/authContext";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${server}/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data.success === true) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  });

  const logout = () => {
    // alert()

    axios
      .get(`${server}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          My Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/blogs" className="nav-link active" aria-current="page">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              {!isLoggedIn && (
                <Link to="/login" className="nav-link">
                  LogIn
                </Link>
              )}
            </li>

            {!isLoggedIn && (
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Post
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li onClick={logout} className="nav-item">
                <Link className="nav-link">Logout</Link>
              </li>
            )}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link disabled"
                href="#"
                // tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
