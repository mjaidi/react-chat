import React, { Component } from "react";
import ConversationsList from "components/ConversationsList";
import PleaseLogin from "components/PleaseLogin";
import { matchPath } from "react-router-dom";

class Conversations extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const hideConversationsListForMobileConversations = () => {
      const match = matchPath(this.props.history.location.pathname, {
        path: "/conversations/:id",
        exact: true,
        strict: false
      });
      if (match !== null && this.props.isMobile) {
        return true;
      }
      return false;
    };

    if (isAuthenticated()) {
      return (
        <div>
          {!hideConversationsListForMobileConversations() && (
            <ConversationsList
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

export default Conversations;
