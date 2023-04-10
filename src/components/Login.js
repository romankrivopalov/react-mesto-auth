import AuthForm from "./AuthForm";
import auth from "../utils/auth";

function Login({ setLoggedIn, navigate }) {
  function handleAuthorizationUser(userData) {
    auth.getAuthorizationUser(userData)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate("/");
        }
      })
  }

  return (
    <AuthForm title='Вход' btnText='Войти' handleSubmit={handleAuthorizationUser} />
  )
}

export default Login
