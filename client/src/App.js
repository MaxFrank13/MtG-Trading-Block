import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Profile from'./pages/Profile';
import TradeBlock from'./pages/TradeBlock';
import Collection from'./pages/Collection';


function App() {
  return (
    <Router>
    <div className="wrapper">
      <Header /> 
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={<TradeBlock/>} 
          />
          <Route 
            path="/profile" 
            element={<Profile />} 
          />
          <Route 
            path="/collection" 
            element={<Collection />} 
          />
        </Routes>
      </div>    
    </div>
  </Router>
  );
}

export default App;
