import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route index element={ <News pageSize={8} country="us" key="general" category="general"/>} />
        <Route exact path="/entertainment" element={  <News pageSize={8} country="us" key="entertainment" category="entertainment"/>} />
        <Route exact path="/health" element={   <News pageSize={8} country="us" category="health" key="health"/>} />
        <Route exact path="/science" element={  <News pageSize={8} country="us" category="science" key="science"/>} />
        <Route exact path="/sports" element={<News pageSize={8} country="us" category="sports" key="sports"/>} />    
        <Route exact path="/technology" element={<News pageSize={8} country="us" category="technology" key="technology"/>} />    
        <Route exact path="/general" element={<News pageSize={8} country="us" category="general" key="general"/>} />             
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
