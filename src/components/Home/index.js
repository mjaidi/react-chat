import React, { Component } from "react";

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return <div> Hello </div>;
    }
    return (
      <div className="container">
        <h4>
          You are not logged in! Please{" "}
          <a
            style={{ cursor: "pointer" }}
            href="#"
            onClick={this.login.bind(this)}
          >
            Log In
          </a>{" "}
          to continue.
        </h4>
      </div>
    );
  }
}

export default Home;
