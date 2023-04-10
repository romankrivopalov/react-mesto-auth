import AuthForm from "./AuthForm";
import auth from "../utils/auth";

function Login({ setUserEmail, setLoggedIn, navigate }) {
  function handleAuthorizationUser(userData) {
    auth.getAuthorizationUser(userData)
      .then(data => {
        if (data.token) {
          // console.log(data) // токен
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          // setUserEmail(data)
          navigate("/");
        }
      })
  }

  return (
    <AuthForm title='Вход' btnText='Войти' handleSubmit={handleAuthorizationUser} />
  )
}

export default Login
