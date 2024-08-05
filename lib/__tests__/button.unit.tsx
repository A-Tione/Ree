import React from 'react'
import {render} from "@testing-library/react";
import '@testing-library/jest-dom'
import Button from '../button'

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

describe('button', () => {
    it('是个 div', () => {
        const json = render(<Button />).container
        expect(json).toMatchSnapshot()
    })
})