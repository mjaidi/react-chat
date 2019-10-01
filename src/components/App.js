import React, { Component } from "react";
import logo from "assets/logo.svg";

class App extends Component {
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
      this.props.history.push("/home");
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="app">
        <header className="navbar">
          <div className="navbar-left">
            <img src={logo} className="navbar-logo" alt="logo" />
            <p className="navbar-link" onClick={this.goTo.bind(this, "home")}>
              Home
            </p>
          </div>

          {!isAuthenticated() && (
            <p className="navbar-link" onClick={this.login.bind(this)}>
              Log In
            </p>
          )}
          {isAuthenticated() && (
            <p className="navbar-link" onClick={this.logout.bind(this)}>
              Log Out
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
