import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import auth from "../utils/auth";

function Register({ navigate }) {
  function handleRegistrationUser(userData) {
    auth.getRegistrationUser(userData)
      .then(data => {
        navigate("/signin");
      })
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
