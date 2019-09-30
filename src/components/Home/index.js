import React, { Component } from "react";
import UserList from "components/UserList";
import Conversation from "components/Conversation";

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return (
        <div className="home">
          <UserList client={this.props.client} history={this.props.history} />
          <Conversation />
        </div>
      );
    }
    return (
      <div className="container">
        <h4>You are not logged in! Please login to continue</h4>
      </div>
    );
  }
}

export default Home;
