import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auction from "./components/Auction";
import User from "./components/User";
import Auctions from "./components/Auctions";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navigation/Navbar";
import Search from "./components/Search";
import Login from "./components/Login";
import CreateAuction from "./components/CreateAuction";
import Register from "./components/Register";

function App() {

  return (
      <div className="App">
        <Router>
          <div>
              <Navbar/>
            <Routes>
                <Route path="/user" element={<User/>}/>
                <Route path="/auctions/:id" element={<Auction/>}/>
                <Route path="/auctions" element={<Auctions/>}/>
                <Route path="" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/createauction" element={<CreateAuction/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;