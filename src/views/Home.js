import React, { Component } from "react";
import Sidebar from "components/Sidebar";
import PleaseLogin from "components/PleaseLogin";
import { matchPath } from "react-router-dom";

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const hideSidebarForMobileConversations = () => {
      const match = matchPath(this.props.history.location.pathname, {
        path: "/home/conversations/:id",
        exact: true,
        strict: false
      });
      if (match !== null && window.innerWidth < 768) {
        return true;
      }
      return false;
    };

    if (isAuthenticated()) {
      return (
        <div className="home">
          {!hideSidebarForMobileConversations() && (
            <Sidebar
              client={this.props.client}
              history={this.props.history}
              activeConversation={this.props.history.location.id}
            />
          )}
        </div>
      );
    }
    return <PleaseLogin />;
  }
}

export default Home;
