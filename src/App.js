import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from './components/Game';
import './App.css';
import Navbar from './components/Navbar';
import Link from "./components/Link"
import Zora from "./components/Zora"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Link />
        <Zora />
        <Game />
      </div>
    </Router>
  );
}

export default App;
