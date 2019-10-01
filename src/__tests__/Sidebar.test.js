import React from "react";
import { mount } from "enzyme";
import { MockedProvider, wait } from "@apollo/react-testing";

import Sidebar, { fetchMyConversations } from "components/Sidebar";

const mocks = [
  {
    request: {
      query: fetchMyConversations,
      variables: {
        id: "1341"
      }
    },
    result: {
      data: {
        conversations: [
          {
            id: "1",
            conversation_members: [
              {
                id: "1",
                member: {
                  id: "1",
                  auth0_id: "1",
                  username: "majid",
                  __typename: "users"
                },
                __typename: "conversation_members"
              }
            ],
            __typename: "conversations"
          }
        ]
      }
    }
  }
];

describe("Sidebar", () => {
  let component;
  const wait = (time = 0) => new Promise(res => setTimeout(res, time));
  const executeMockProviderTestCase = componentInstance => {
    return wait(100).then(() => componentInstance.update());
  };
  beforeEach(() => {
    component = mount(
      <MockedProvider mocks={mocks} addTypeName={false} removeTypename>
        <Sidebar />
      </MockedProvider>
    );
  });
  it("should render correctly without crashing", () => {
    expect(component).toMatchSnapshot();
  });

  it("should contain 1 conversation", () => {
    return executeMockProviderTestCase(component).then(() => {
      expect(component.find(".sidebar-link").length).to.equal(1);
    });
  });
});
