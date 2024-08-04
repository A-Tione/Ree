import React from "react";
import Icon from "../icon/icon";
import renderer from "react-test-renderer";

jest.mock('../icon/importIcons', () => {
  return {
    context: () => {
      const keys = () => [];
      const module = (key: string) => null;
      return {
        keys,
        module,
      };
    }
  };
});

describe("icon", () => {
  it("是个 svg", () => {
    const json = renderer.create(<Icon name="wechat" />).toJSON();
    expect(json).toMatchSnapshot();
  });
  it("onClick", () => {
    const fn = jest.fn();
    const json = renderer.create(<Icon name="apple" onClick={fn} />).toJSON();

    if (json && !Array.isArray(json) && json.props) {
      expect(json).toMatchSnapshot();
      json.props.onClick();
      expect(fn).toHaveBeenCalled();
    } else {
      throw new Error("json is not valid");
    }
  })
})