import React from "react";
import Message from "components/Message";

const MessagesList = ({ data }) => (
  <div className="messages-list">
    <p className="messages-list-title">
      {" "}
      {!data.messages ? 0 : data.messages.length} Messages
    </p>
    <div className="messages-list-content">
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

export default MessagesList;
