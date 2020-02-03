import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  render() {
    const { authenticated } = this.props;
    return (
      <ul className="menu"> 
        <li className="header-tweet-icon">
          <img class="tweet-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg" />
        </li>       
        <li>
          <Link to="/"><i className="fa fa-home"></i>Home</Link>
        </li>
        {authenticated ? (
          <li onClick={this._handleLogoutClick}>Logout</li>
        ) : ""}
      </ul>
    );
  }


  _handleLogoutClick = () => {
    window.open("http://localhost:4000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
}
