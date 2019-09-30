import React, { Component } from "react";
import logo from "assets/logo.svg";
import "stylesheets/App.scss";

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
      <div className="App">
        <button onClick={this.goTo.bind(this, "home")}>Home</button>
        {!isAuthenticated() && (
          <button onClick={this.login.bind(this)}>Log In</button>
        )}
        {isAuthenticated() && (
          <button onClick={this.logout.bind(this)}>Log Out</button>
        )}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
