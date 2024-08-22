import React from "react";
import { createRoot } from "react-dom/client";
import { Icon } from "./lib";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IconExample from "./lib/icon/icon.example";
import ButtonExample from "./lib/button.example";
import DialogExample from "./lib/dialog/dialog.example";
import LayoutExample from "./lib/layout/layout.example";
import {Layout, Aside, Header, Content, Footer} from './lib/layout/layout'
import './example.scss'


const container = document.getElementById("root");

const root = container ? createRoot(container) : null;

root?.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="log">
          <Icon name='ree' style={{width: '4em', height: '4em', color: '#50A060'}} />
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
            <li>
              <Link to="/button">Button</Link>
            </li>
            <li>
              <Link to="/dialog">Dialog</Link>
            </li>
            <li>
              <Link to="/layout">布局</Link>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Routes>
            <Route path="/icon" element={<IconExample />} />
            <Route path="/button" element={<ButtonExample />} />
            <Route path="/dialog" element={<DialogExample />} />
            <Route path="/layout" element={<LayoutExample />} />
          </Routes>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; A-Tione
      </Footer>
    </Layout>
  </Router>
)