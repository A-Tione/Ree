import React from "react";
import { createRoot } from "react-dom/client";
import Button from "./button";

export { Button };

const root = document.getElementById("root")

if (root !== null) {
  createRoot(root).render(<Button />);
} else {
  console.error('root not found');
}

