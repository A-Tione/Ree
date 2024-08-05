import React from "react";
import Icon from "../icon/icon";
import {render, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom'

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
    const json = render(<Icon name="apple" />).container;
    expect(json).toMatchSnapshot();
  });
  it("onClick", () => {
    const fn = jest.fn();
    const {getByRole} = render(<Icon name="apple" role="button" onClick={fn} />);
    
    fireEvent.click(getByRole('button'));
    expect(fn).toHaveBeenCalled();
  })
})