import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import MessagesList from "components/MessagesList";
import MessageForm from "components/MessageForm";
import PleaseLogin from "components/PleaseLogin";
import Loader from "components/Loader";

export const fetchMessages = gql`
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
    const isMobile = () => window.innerWidth < 768;
    if (isAuthenticated()) {
      return (
        <div className="conversation-wrapper">
          <div
            className={
              isMobile()
                ? "conversation-main"
                : "conversation-main offset-conversation"
            }
          >
            <Subscription
              subscription={fetchMessages}
              variables={{ id: this.props.history.location.id }}
            >
              {({ data, error, loading }) => {
                if (loading) {
                  return <Loader className="offset" />;
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