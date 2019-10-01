import React from "react";
import { shallow } from "enzyme";
import App from "components/App";
import Auth from "../auth/auth0.js";

describe("App", () => {
  let component;
  beforeEach(() => {
    component = shallow(<App auth={new Auth()} />);
    component.instance().login = jest.fn();
    component.instance().logout = jest.fn();
    component.instance().forceUpdate();
  });
  it("should render correctly without crashing", () => {
    expect(component).toMatchSnapshot();
  });

  it("should call login on login button pressed", () => {
    component.find("#login").simulate("click");
    expect(component.instance().login).toHaveBeenCalled();
  });

  it("should call logout on logout button pressed", () => {
    component.setProps({ auth: { isAuthenticated: () => true } });
    component.find("#logout").simulate("click");
    expect(component.instance().logout).toHaveBeenCalled();
  });
});
