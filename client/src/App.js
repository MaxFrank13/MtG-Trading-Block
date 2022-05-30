import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

function App() {
  return (
    <Router>
    <div className="wrapper">
      <Header />     
    </div>
  </Router>
  );
}

export default App;
