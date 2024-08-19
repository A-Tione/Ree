import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IconExample from "./lib/icon/icon.example";
import ButtonExample from "./lib/button.example";
import DialogExample from "./lib/dialog/dialog.example";
import LayoutExample from "./lib/layout/layout.example";


const container = document.getElementById("root");

const root = container ? createRoot(container) : null;

root?.render(
  <Router>
    <div>
      <header>
        <h1 className="logo">REE</h1>
      </header>
      <div>
        <aside>
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
        </aside>
        <main>
        <Routes>
          <Route path="/icon" element={<IconExample />} />
          <Route path="/button" element={<ButtonExample />} />
          <Route path="/dialog" element={<DialogExample />} />
          <Route path="/layout" element={<LayoutExample />} />
        </Routes>
        </main>
      </div>
    </div>
  </Router>
)