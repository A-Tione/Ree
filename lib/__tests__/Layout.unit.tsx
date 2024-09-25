import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Layout, Aside, Header, Content, Footer} from '../layout/layout';


describe('Layout component', () => {
  it('renders Layout with Header, Content, and Footer', () => {
    render(
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies correct classes', () => {
    const { container } = render(
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );

    expect(container.firstChild).toHaveClass('ree-layout');
    expect(container.querySelector('.ree-layout-header')).toBeInTheDocument();
    expect(container.querySelector('.ree-layout-content')).toBeInTheDocument();
    expect(container.querySelector('.ree-layout-footer')).toBeInTheDocument();
  });

  it('applies hasAside class when Aside is present', () => {
    const { container } = render(
      <Layout>
        <Aside>Aside</Aside>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    );

    expect(container.firstChild).toHaveClass('ree-layout-hasAside');
  });

  it('allows custom className', () => {
    const { container } = render(
      <Layout className="custom-class">
        <Content>Content</Content>
      </Layout>
    );

    expect(container.firstChild).toHaveClass('ree-layout');
    expect(container.firstChild).toHaveClass('custom-class');
  });
});


