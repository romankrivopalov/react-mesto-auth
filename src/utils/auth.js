import { authSetting } from "./constants";

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getRegistrationUser({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => res.json())
  }

  getAuthorizationUser({ password, email }) {
    console.log(password, email)
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => res.json())
  }

  checkValidityUser({ id, email }) {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
      body: JSON.stringify({
        "_id": id,
        "email": email,
      })
    })
  }
}

const auth = new Auth(authSetting);

export default auth
