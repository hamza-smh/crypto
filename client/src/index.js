import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Blocks from "./components/Blocks";
import ConductTransaction from "./components/ConductTransaction";
import TransactionPool from "./components/TransactionPool";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blocks" element={<Blocks />} />
      <Route path="/conduct-transaction" element={<ConductTransaction />} />
      <Route path="/transaction-pool" element={<TransactionPool />} />
    </Routes>
  </BrowserRouter>
);
