import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Icon, Button } from "./lib";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import IconDemo from './lib/icon/icon.demo'
import ButtonExample from "./lib/button.example";
import DialogExample from "./lib/dialog/dialog.demo";
import LayoutExample from "./lib/layout/layout.demo";
import FormExample from "./lib/form/form.demo";
import ScrollExample from "./lib/scroll/scroll.example";
import TreeExample from "./lib/tree/tree.example";
import CitySelectExample from "./lib/citySelect/citySelect.example";
import {Layout, Aside, Header, Content, Footer} from './lib/layout/layout'
import './example.scss'

const container = document.getElementById("root");

const root = container ? createRoot(container) : null;

const App = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsAsideOpen(false);
    }
  }, [location]);

  return (
    <Layout className="site-page">
      <div className={`mask ${isAsideOpen ? 'active' : ''}`} onClick={() => setIsAsideOpen(false)}></div>
      <Header className="site-header">
        <div className="site-header-left">
          <div className="toggle-sidebar" onClick={() => setIsAsideOpen(!isAsideOpen)}>
            <Button>
              <Icon name="menu" style={{width: '2em', height: '2em'}}/>
            </Button>
          </div>
          <div className="logo">
              <Icon name='ree' style={{width: '8em', height: '4em', color: '#50A060'}} />
          </div>
        </div>
        <a className="github" href="https://github.com/A-Tione/ree/tree/main" target="_blank" rel="noopener noreferrer">
            <Icon name="github" style={{width: '2em', height: '4em'}}/>
        </a>
      </Header>
      <Layout>
        <Aside className={`site-aside ${isAsideOpen ? 'open' : ''}`} style={{display: window.innerWidth < 768 ? 'none' : 'block'}}>
          {isAsideOpen && <Header className="site-header" style={{margin: '-8px -16px', paddingLeft: '8px'}}>
            <div className="logo">
                <Icon name='ree' style={{width: '8em', height: '4em', color: '#50A060'}} />
            </div>
          </Header>}
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
            <li>
              <NavLink to="/scroll">Scroll</NavLink>
            </li>
            <li>
              <NavLink to="/tree">Tree</NavLink>
            </li>
            <li>
              <NavLink to="/citySelect">CitySelect</NavLink>
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
            <Route path="/scroll" element={<ScrollExample />} />
            <Route path="/tree" element={<TreeExample />} />
            <Route path="/citySelect" element={<CitySelectExample />} />
          </Routes>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; A-Tione
      </Footer>
    </Layout>
  );
};

root?.render(
  <Router>
    <App />
  </Router>
);