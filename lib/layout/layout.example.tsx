import React from 'react'
import Layout from './layout'
import Header from './header'
import Content from './content'
import Footer from './footer'
import Aside from './aside'

export default function () {
  return (
    <>
      <div>
        <h1>这是一个布局例子</h1>
        <Layout style={{height: 600}} className="hi hasAside">
          <Aside>aside</Aside>
          <Layout>
            <Header>header</Header>
            <Content>content</Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </div>
    </>
  )
}