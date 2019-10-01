import React, { Component } from "react";
import gql from "graphql-tag";

const newMessage = gql`
  mutation newMessage(
    $currentUser: String!
    $conversation: Int!
    $message: String!
  ) {
    insert_messages(
      objects: {
        conversation_id: $conversation
        user_id: $currentUser
        message: $message
      }
    ) {
      affected_rows
    }
  }
`;

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  componentDidMount() {
    this.messageBox.focus();
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event, user) => {
    event.preventDefault();
    this.props.client.mutate({
      mutation: newMessage,
      variables: {
        currentUser: user,
        conversation: this.props.activeConversation,
        message: this.state.value
      }
    });
    this.setState({ value: "" }); // Reset message input
  };

  render() {
    const currentUser = localStorage.getItem("auth0:id_token:sub");

    return (
      <form
        onSubmit={e => this.handleSubmit(e, currentUser)}
        className="message-editor"
      >
        <input
          ref={input => {
            this.messageBox = input;
          }}
          type="text"
          className="form-control"
          autoComplete="off"
          value={this.state.value}
          name="content"
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    );
  }
}

export default MessageForm;
