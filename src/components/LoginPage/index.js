import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    isLoginSuccess: true,
    errMsg: '',
  }

  changeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  changePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }

  failureMsg = errorMsg => {
    this.setState({isLoginSuccess: false, errMsg: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const loginData = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(loginData.jwt_token)
    } else {
      this.failureMsg(loginData.error_msg)
    }
  }

  render() {
    const {usernameInput, passwordInput, isLoginSuccess, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const isThereError = isLoginSuccess ? null : (
      <p className="error-msg">*{errMsg}</p>
    )

    return (
      <div className="login-bg-container">
        <form className="login-card" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <div className="username-container">
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="username-input"
              onChange={this.changeUsername}
              value={usernameInput}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password" className="password-label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="password-input"
              onChange={this.changePassword}
              value={passwordInput}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isThereError}
        </form>
      </div>
    )
  }
}

export default LoginPage
