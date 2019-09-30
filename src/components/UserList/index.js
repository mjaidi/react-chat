import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const currentUser = localStorage.getItem("auth0:id_token:sub");
const fetchOtherUsers = gql`
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
      auth0_id
      id
      username
    }
  }
`;
const fetchMyConversations = gql`
  subscription fetchMyConversations($id: String!) {
    users(
      where: {
        user_conversations: {
          conversation: {
            conversation_members: { member: { auth0_id: { _eq: $id } } }
          }
        }
      }
    ) {
      auth0_id
      id
      username
    }
  }
`;

const newConversation = gql`
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
          conversation_members {
            member {
              id
            }
          }
        }
      }
    }
  }
`;

function handleNewConversation(e, id, current, mutate) {
  console.log(e);
  console.log(id);
  e.preventDefault();
  mutate({
    mutation: newConversation,
    variables: {
      currentUser: current,
      otherUser: id
    }
  });
}

class UserList extends Component {
  goTo(route, id) {
    this.props.history.push({
      pathname: `${route}/${id}`,
      id: id
    });
  }

  render() {
    return (
      <div className="container">
        <Subscription
          subscription={fetchOtherUsers}
          variables={{ id: currentUser }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return "Error loading online users";
            } else {
            }
            return (
              <div>
                <p className="userListHeading">
                  {" "}
                  Other Users ({!data.users ? 0 : data.users.length})
                </p>
                <ul className="userList">
                  {data.users.map(u => {
                    return (
                      <li key={u.id}>
                        {u.username}
                        <button
                          onClick={e =>
                            handleNewConversation(
                              e,
                              u.auth0_id,
                              currentUser,
                              this.props.client.mutate
                            )
                          }
                        >
                          New Conversation
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }}
        </Subscription>
        <Subscription
          subscription={fetchMyConversations}
          variables={{ id: currentUser }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return "Error loading online users";
            } else {
            }
            return (
              <div>
                <p className="userListHeading">
                  {" "}
                  My Conversations ({!data.users ? 0 : data.users.length})
                </p>
                <ul className="userList">
                  {data.users.map(u => {
                    return (
                      <li key={u.id}>
                        {u.username}
                        <button
                          onClick={this.goTo.bind(this, "conversations", u.id)}
                        >
                          New Conversation
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }}
        </Subscription>
      </div>
    );
  }
}

export default UserList;
