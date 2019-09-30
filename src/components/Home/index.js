import React, { Component } from "react";

import UserList from "components/UserList";

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return <UserList />;
    }
    return (
      <div className="container">
        <h4>You are not logged in! Please login to continue</h4>
      </div>
    );
  }
}

export default Home;
