import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register() {
  return (
    <AuthForm title='Регистрация' btnText='Зарегистрироваться'>
      <Link
        to="/"
        className="auth-form__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  )
}

export default Register
