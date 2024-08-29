import React from 'react'
import {Layout, Aside, Header, Content, Footer} from './layout'
import './layout.example.scss'

export default function () {
  return (
    <>
      <div>
        <h1>这是第三个布局例子</h1>
        <Layout style={{height: 600}} className="hi">
          <Header className='h'>header</Header>
          <Layout className='hasAside'>
            <Aside className='a'>aside</Aside>
            <Layout>
              <Content className='c'>content</Content>
              <Footer className='f'>footer</Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </>
  )
}