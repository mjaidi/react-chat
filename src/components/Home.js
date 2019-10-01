import React, { Component } from "react";
import Sidebar from "components/Sidebar";
import PleaseLogin from "components/PleaseLogin";

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return (
        <div className="home">
          <Sidebar client={this.props.client} history={this.props.history} />
        </div>
      );
    }
    return <PleaseLogin />;
  }
}

export default Home;
