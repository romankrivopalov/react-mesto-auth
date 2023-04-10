import { Routes, Route, Link } from 'react-router-dom';
import logoWhite from '../images/logo-white.svg'

function Header({ loggedIn }) {
  return (
    <header className="header container">
      <Link to='/'>
        <img src={logoWhite} alt=" Логотип сервиса Место." className="header__logo" />
      </Link>

      <Routes>
        <Route path='/signin' element={
          <Link to='/signup' className='header__link'>
            Регистрация
          </Link>
        } />

        <Route path='/signup' element={
          <Link to='/signin' className='header__link'>
            Войти
          </Link>
        } />

      </Routes>
    </header>
  )
}

export default Header;
