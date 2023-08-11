import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/useAuth";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("test");
      if (user) {
        console.log(user);
        setUser({ id: user.uid, email: user.email });
        setShow(true);
      } else {
        console.log("null");
        setUser(null);
        setShow(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          BadBank
        </a>
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
              <a
                className="nav-link active"
                aria-current="page"
                href="#/CreateAccount"
              >
                Create Account
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Login">
                Login
              </a>
            </li>
            {show && <li className="nav-item">
              <a className="nav-link" href="#Withdraw">
                Withdraw
              </a>
            </li>}
            {show && <li className="nav-item">
              <a className="nav-link" href="#Deposit">
                Deposit
              </a>
            </li>}
            {show && <li className="nav-item">
              <a className="nav-link" href="#Balance">
                Balance
              </a>
            </li>}
            <li className="nav-item">
              <a className="nav-link" href="#/AllData">
                AllData
              </a>
            </li>
            {show && <li className="nav-item">
              <a className="nav-link" href="#/Transfer">
                Trasfer
              </a>
            </li>}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
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
