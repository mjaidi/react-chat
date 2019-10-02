import React from "react";
import { shallow } from "enzyme";
import Conversations from "views/Conversations";
import Auth from "../auth/auth0.js";
import history from "../history";

describe("Conversations", () => {
  let component;
  beforeEach(() => {
    component = shallow(<Conversations auth={new Auth()} history={history} />);
  });
  it("should render correctly without crashing", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render PleaseLogin component if authentication fails", () => {
    expect(component.find("PleaseLogin").exists()).toBe(true);
    expect(component.find("ConversationsList").exists()).toBe(false);
  });

  it("should render ConversationsList component if authentication succeeds", () => {
    component.setProps({ auth: { isAuthenticated: () => true } });
    expect(component.find("PleaseLogin").exists()).toBe(false);
    expect(component.find("ConversationsList").exists()).toBe(true);
  });
});
