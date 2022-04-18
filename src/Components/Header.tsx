import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <img src='/recipeco.png' alt='Recip-Eco logo' />
        <h1>Recip-Eco</h1>
      </Link>
    </header>
  )
}

export default Header;