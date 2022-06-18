import React, { Component } from "react";
// import "bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css";
import "../StyleSheets/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navStick">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img src="..." alt="LoGo" />
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
            <div
              className="justify-content-between collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item" onClick={this.props.homeclickhandler}>
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    About
                  </a>
                </li>
                <li className="nav-item" onClick={this.props.shopclickHandler} >
                  <a className="nav-link active" aria-current="page">
                    Add-Shop<i className="fa-solid fa-plus"></i>
                  </a>
                </li>
              </ul>


              <div className="appName">Shop~List</div>
              {/* <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search with name.."
                  aria-label="Search with name.."
                  onChange={this.props.searchInputHandler}
                />
              </form> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
