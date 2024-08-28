import React from "react";
import { createRoot } from "react-dom/client";
import { Icon } from "./lib";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import IconDemo from './lib/icon/icon.demo'
import ButtonExample from "./lib/button.example";
import DialogExample from "./lib/dialog/dialog.example";
import LayoutExample from "./lib/layout/layout.example";
import FormExample from "./lib/form/form.example";
import {Layout, Aside, Header, Content, Footer} from './lib/layout/layout'
import './example.scss'


const container = document.getElementById("root");

const root = container ? createRoot(container) : null;

root?.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <Icon name='ree' style={{width: '4em', height: '4em', color: '#50A060'}} />
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <ul>
            <li>
              <NavLink to="/icon">Icon</NavLink>
            </li>
            <li>
              <NavLink to="/dialog">Dialog</NavLink>
            </li>
            <li>
              <NavLink to="/layout">Layout</NavLink>
            </li>
            <li>
              <NavLink to="/form">Form</NavLink>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Routes>
            <Route path="/icon" element={<IconDemo />} />
            <Route path="/button" element={<ButtonExample />} />
            <Route path="/dialog" element={<DialogExample />} />
            <Route path="/layout" element={<LayoutExample />} />
            <Route path="/form" element={<FormExample />} />
          </Routes>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; A-Tione
      </Footer>
    </Layout>
  </Router>
)