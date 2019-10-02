import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import Loader from "components/Loader";

export const fetchMyConversations = gql`
  subscription fetchMyConversations($id: String!) {
    conversations(where: { conversation_members: { user_id: { _eq: $id } } }) {
      id
      conversation_members {
        id
        member {
          id
          auth0_id
          username
        }
      }
    }
  }
`;
export const fetchOtherUsers = gql`
  subscription fetchOtherUsers($id: String!) {
    users(
      where: {
        _not: {
          user_conversations: {
            conversation: {
              conversation_members: { member: { auth0_id: { _eq: $id } } }
            }
          }
        }
      }
    ) {
      id
      auth0_id
      username
    }
  }
`;

export const newConversation = gql`
  mutation newConversation($currentUser: String!, $otherUser: String!) {
    insert_conversation_members(
      objects: {
        conversation: {
          data: { conversation_members: { data: { user_id: $otherUser } } }
        }
        user_id: $currentUser
      }
    ) {
      returning {
        conversation {
          id
        }
      }
    }
  }
`;

class Sidebar extends Component {
  goTo(route, id) {
    this.props.history.push({
      pathname: `/${route}/${id}`,
      id: id
    });
  }

  handleNewConversation(e, otherUser, currentUser, mutate) {
    e.preventDefault();
    mutate({
      mutation: newConversation,
      variables: {
        currentUser: currentUser,
        otherUser: otherUser
      }
    }).then(result => {
      this.goTo(
        "home/conversations",
        result.data.insert_conversation_members.returning[0].conversation.id
      );
    });
  }

  conversationMemberNames(conversation, currentUser) {
    // Get only the usernames of the other participants of a conversation
    const otherMembers = conversation.conversation_members.filter(
      m => m.member.auth0_id !== currentUser
    );
    return otherMembers.map(m => m.member.username).join(", ");
  }

  render() {
    const currentUser = localStorage.getItem("auth0:id_token:sub");
    return (
      <aside id="sidebar">
        <Subscription
          subscription={fetchMyConversations}
          variables={{ id: currentUser }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <Loader />;
            }
            if (error) {
              return "Error loading conversations";
            }
            return (
              <div>
                <p className="sidebar-heading">
                  {" "}
                  My Conversations (
                  {!data.conversations ? 0 : data.conversations.length})
                </p>
                <ul className="sidebar-list">
                  {data.conversations.map(c => {
                    return (
                      <li
                        key={c.id}
                        className={
                          c.id === this.props.activeConversation
                            ? "active"
                            : null
                        }
                        onClick={this.goTo.bind(
                          this,
                          "home/conversations",
                          c.id
                        )}
                      >
                        {this.conversationMemberNames(c, currentUser)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }}
        </Subscription>
        <Subscription
          subscription={fetchOtherUsers}
          variables={{ id: currentUser }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <Loader />;
            }
            if (error) {
              return "Error loading  users";
            }
            const filteredUsers = data.users.filter(
              u => u.auth0_id !== currentUser
            );
            return (
              <div>
                <p className="sidebar-heading"> Chat with other users</p>
                <ul className="sidebar-list">
                  {filteredUsers.map(u => {
                    return (
                      <li
                        key={u.id}
                        onClick={e =>
                          this.handleNewConversation(
                            e,
                            u.auth0_id,
                            currentUser,
                            this.props.client.mutate
                          )
                        }
                      >
                        {u.username}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }}
        </Subscription>
      </aside>
    );
  }
}

export default Sidebar;
