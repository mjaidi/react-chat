import React, { Component } from "react";
import logo from "assets/logo.svg";

class Navigation extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.history.push("/conversations");
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <header className="navbar">
          <div className="navbar-left">
            <img src={logo} className="navbar-logo" alt="logo" />
            <p
              className="navbar-link"
              onClick={this.goTo.bind(this, "conversations")}
            >
              Conversations
            </p>
          </div>

          {!isAuthenticated() && (
            <p
              className="navbar-link"
              id="login"
              onClick={this.login.bind(this)}
            >
              Log In
            </p>
          )}
          {isAuthenticated() && (
            <p
              className="navbar-link"
              id="logout"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default Navigation;
