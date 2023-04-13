import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutFromPage = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <div className="main-header-container">
        <Link to="/" className="link-item-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="list-header-lg-container">
          <Link to="/" className="link-item-header">
            <li className="home-lg-text-header">Home</li>
          </Link>
          <Link to="/jobs" className="link-item-header">
            <li className="jobs-lg-text-header">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-header"
          onClick={logoutFromPage}
        >
          Logout
        </button>
        <ul className="list-header-sm-container">
          <Link to="/" className="link-item-header">
            <li className="list-item-home-header">
              <AiFillHome className="home-icon-header" />
            </li>
          </Link>
          <Link to="/jobs" className="link-item-header">
            <li className="list-item-brief-header">
              <BsFillBriefcaseFill className="breif-icon-header" />
            </li>
          </Link>
          <li className="list-item-logout-header">
            <button
              className="logout-icon-button-header"
              type="button"
              onClick={logoutFromPage}
            >
              <FiLogOut className="logout-icon-header" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
