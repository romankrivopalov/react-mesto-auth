import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import auth from "../utils/auth";

function Register({ navigate, setUserEmail, onInfoTooltipOpen }) {
  function handleRegistrationUser(userData) {
    auth.getRegistrationUser(userData)
      .then(data => {
        console.log(data.status)
        // console.log(data) // id и email
        navigate("/signin");
        setUserEmail(data.email)
        onInfoTooltipOpen({ isOpen: true, status: true })
      })
      .catch(() => onInfoTooltipOpen({ isOpen: true, status: false }))
  }

  return (
    <AuthForm title='Регистрация' btnText='Зарегистрироваться' handleSubmit={handleRegistrationUser}>
      <Link
        to="/"
        className="auth-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  )
}

export default Register
