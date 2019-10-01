import React from "react";
import { shallow } from "enzyme";
import Home from "components/Home";
import Auth from "../auth/auth0.js";

describe("Home", () => {
  let component;
  beforeEach(() => {
    component = shallow(<Home auth={new Auth()} />);
  });
  it("should render correctly without crashing", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render PleaseLogin component if authentication fails", () => {
    expect(component.find("PleaseLogin").exists()).toBe(true);
    expect(component.find("Sidebar").exists()).toBe(false);
  });

  it("should render Sidebar component if authentication succeeds", () => {
    component.setProps({ auth: { isAuthenticated: () => true } });
    expect(component.find("PleaseLogin").exists()).toBe(false);
    expect(component.find("Sidebar").exists()).toBe(true);
  });
});
