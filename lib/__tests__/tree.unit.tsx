import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import Tree from '../tree/tree';

describe('Tree component', () => {
  const testData = [
    {
      text: 'Parent 1',
      value: 'parent1',
      children: [
        { text: 'Child 1.1', value: 'child1.1' },
        { text: 'Child 1.2', value: 'child1.2' },
      ],
    },
    {
      text: 'Parent 2',
      value: 'parent2',
      children: [
        { text: 'Child 2.1', value: 'child2.1' },
      ],
    },
  ];

  it('renders tree structure correctly', () => {
    render(<Tree sourceData={testData} selected="parent1" onChange={() => {}} />);    
    expect(screen.getByText('Parent 1')).toBeInTheDocument();
    expect(screen.getByText('Parent 2')).toBeInTheDocument();
    expect(screen.getByText('Child 1.1')).toBeInTheDocument();
    expect(screen.getByText('Child 1.2')).toBeInTheDocument();
    expect(screen.getByText('Child 2.1')).toBeInTheDocument();
  });

  it('expands and collapses nodes on click', () => {
    render(<Tree sourceData={testData} selected="parent1" onChange={() => {}} />);
    
    const parent1 = screen.getByText('Parent 1');
    const expandButton = parent1.nextElementSibling?.querySelector('.ree-tree-collapse');
    fireEvent.click(expandButton!);
    expect(expandButton!.classList.contains('ree-tree-expand')).toBe(true);
    fireEvent.click(expandButton!);
    expect(expandButton!.classList.contains('ree-tree-collapse')).toBe(true);
  });

  it('calls onChange when a node is selected', () => {
    const onChange = jest.fn();
    render(<Tree sourceData={testData} selected="parent1" onChange={onChange} />);
    
    const checkbox = screen.getByText('Child 1.1');
    fireEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalled();
  });

  it('applies selected class to the selected node', () => {
    render(<Tree sourceData={testData} selected="child1.1" onChange={() => {}} />);
    
    const selectedNode = screen.getByText('Child 1.1').parentElement?.parentElement;
    expect(selectedNode).toHaveClass('ree-tree-item-selected');
  });
  it('multiple selected', () => {
    render(<Tree sourceData={testData} multiple={true} selected={['parent1', 'child1.1']} onChange={() => {}} />);
    const parent1 = screen.getByText('Parent 1');
    fireEvent.click(parent1);
    expect(screen.getByText('Child 1.1')).toBeVisible();
  })
});