import './App.css';
import React, { useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
function  App(){
  const pageSize=10;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [Progress, setProgress] = useState(0)
  const setProgressFunc=(progress)=>
  {
    setProgress(progress)
  }
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={Progress}
        //height={3}
      />
        <Routes>
        <Route index element={ <News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" key="general" category="general"/>} />
        <Route exact path="/entertainment" element={  <News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" key="entertainment" category="entertainment"/>} />
        <Route exact path="/health" element={   <News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" category="health" key="health"/>} />
        <Route exact path="/science" element={  <News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" category="science" key="science"/>} />
        <Route exact path="/sports" element={<News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" category="sports" key="sports"/>} />    
        <Route exact path="/technology" element={<News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" category="technology" key="technology"/>} />    
        <Route exact path="/general" element={<News setProgress=  {setProgressFunc} apikey={  apiKey}   pageSize={  pageSize} country="us" category="general" key="general"/>} />             
        </Routes>
        </BrowserRouter>
      </div>
    )
  }

export default App
