import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import Sidebar from "components/Sidebar";
import Message from "components/Message";
import MessageForm from "components/MessageForm";

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
              return (
                <div className="conversation">
                  <p className="conversation-title">
                    {" "}
                    Messages ({!data.messages ? 0 : data.messages.length})
                  </p>
                  <div className="conversation-content">
                    {data.messages.map(m => {
                      return (
                        <Message
                          key={m.id}
                          message={m.message}
                          created_at={m.created_at}
                          author={m.author.username}
                        />
                      );
                    })}
                    <div
                      ref={e => {
                        if (e) {
                          e.scrollIntoView();
                        }
                      }}
                    />
                  </div>
                </div>
              );
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
}

export default Conversation;
