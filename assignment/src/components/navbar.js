import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className='mb-1 navbar navbar-expand-lg navbar-dark default-color'>
        <Link to='/home'>
          <div className='logo'>BEAN LOVE BEERS</div>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <Link to='/home'>
              <li className='nav-item active'>
                Home <span className='sr-only'>(current)</span>{" "}
              </li>
            </Link>

            <Link to='/favourites'>
              <li className='nav-item'>Favourites </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
