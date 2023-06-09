import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logoWhite from '../images/logo-white.svg'

function Header({ userEmail, onSignOut, isOpenBurger, onToggleBurger }) {
  const { pathname } = useLocation();

  return (
      <header className="header container">
        { pathname === '/' &&
          <section className={`header__aside ${isOpenBurger ? 'header__aside_opened' : ''}`}>
            <p className='header__email'>{userEmail}</p>
            <button onClick={onSignOut} className='header__btn'>
              Выйти
            </button>
          </section>
        }

        <div className='header__columns'>
          <img src={logoWhite} alt=" Логотип сервиса Место." className="header__logo" />

          { pathname === '/' &&
            <div className='header__container'>
              <button className='header__burger' onClick={onToggleBurger}>
                <div className={`header__burger-inner ${isOpenBurger ? 'header__burger-inner_active' : ''}`}></div>
              </button>
              <div className='header__wrapper'>
                <p className='header__email'>{userEmail}</p>
                <button onClick={onSignOut} className='header__btn'>
                  Выйти
                </button>
              </div>
            </div>
          }

          { pathname === '/signin' &&
            <Link to='/signup' className='header__link'>
              Регистрация
            </Link>
          }

          { pathname === '/signup' &&
            <Link to='/signin' className='header__link'>
              Войти
            </Link>
          }
        </div>
      </header>
  )
}

export default Header;
