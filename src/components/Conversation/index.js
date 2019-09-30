import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const fetchOnlineUsersSubscription = gql`
  subscription {
    users {
      auth0_id
      id
      username
    }
  }
`;
class Conversation extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }
  render() {
    return (
      <div className="container">
        <Subscription subscription={fetchOnlineUsersSubscription}>
          {({ data, error, loading }) => {
            if (loading) {
              return null;
            }
            if (error) {
              console.log(error);
              return "Error loading online users";
            } else {
            }
            return (
              <div>
                <p className="userListHeading">
                  {" "}
                  Online Users ({!data.users ? 0 : data.users.length})
                </p>
                <ul className="userList">
                  {data.users.map(u => {
                    return (
                      <li key={u.id}>
                        {u.username}{" "}
                        <button onClick={this.goTo.bind(this, "conversation")}>
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

export default Conversation;
