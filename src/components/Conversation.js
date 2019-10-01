import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import Sidebar from "components/Sidebar";
import MessagesList from "components/MessagesList";
import MessageForm from "components/MessageForm";
import PleaseLogin from "./PleaseLogin";

const fetchMessages = gql`
  subscription fetchMessages($id: Int!) {
    messages(where: { conversation_id: { _eq: $id } }) {
      id
      message
      author {
        id
        auth0_id
        username
      }
      created_at
    }
  }
`;

class Conversation extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return (
        <div className="conversation-wrapper">
          <Sidebar
            client={this.props.client}
            history={this.props.history}
            activeConversation={this.props.history.location.id}
          />
          <div className="conversation-main">
            <Subscription
              subscription={fetchMessages}
              variables={{ id: this.props.history.location.id }}
            >
              {({ data, error, loading }) => {
                if (loading) {
                  return null;
                }
                if (error) {
                  return "Error loading messages";
                } else {
                }
                return <MessagesList data={data} />;
              }}
            </Subscription>

            <MessageForm
              activeConversation={this.props.history.location.id}
              client={this.props.client}
            />
          </div>
        </div>
      );
    }
    return <PleaseLogin />;
  }
}

export default Conversation;
