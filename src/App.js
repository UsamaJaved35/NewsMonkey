import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export class App extends Component {
  pageSize=20;
  //apiKey='6a675f51a78441be932451f253de0130';
  apiKey=process.env.REACT_APP_NEWS_API;
  state={
    progress:0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        //height={3}
      />
        <Routes>
        <Route index element={ <News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" key="general" category="general"/>} />
        <Route exact path="/entertainment" element={  <News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" key="entertainment" category="entertainment"/>} />
        <Route exact path="/health" element={   <News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" category="health" key="health"/>} />
        <Route exact path="/science" element={  <News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" category="science" key="science"/>} />
        <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" category="sports" key="sports"/>} />    
        <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" category="technology" key="technology"/>} />    
        <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apiKey}   pageSize={this.pageSize} country="us" category="general" key="general"/>} />             
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
