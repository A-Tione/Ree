import renderer from 'react-test-renderer'
import React from 'react'
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
        const json = renderer.create(<Button/>).toJSON()
        expect(json).toMatchSnapshot()
    })
})