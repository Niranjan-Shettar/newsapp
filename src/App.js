import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize=5;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})

  }
  render() {
    return (
      <Router>
      <div>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Navbar/>
        
        
        {/* <News pageSize={20} country= "in" category='science'/> */}
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} key='General' pageSize={this.pageSize} country= "in" category='General'/>}/>
          <Route path="/Business" element={<News setProgress={this.setProgress} key='Business' pageSize={this.pageSize} country= "in" category='Business'/>}/>
          <Route path="/Entertainment" element={<News setProgress={this.setProgress} key='Entertainment' pageSize={this.pageSize} country= "in" category='Entertainment'/>}/>
          <Route path="/Health" element={<News setProgress={this.setProgress} key='Health' pageSize={this.pageSize} country= "in" category='Health'/>}/>
          <Route path="/Science" element={<News setProgress={this.setProgress} key='Science' pageSize={this.pageSize} country= "in" category='Science'/>}/>
          <Route path="/Sports" element={<News setProgress={this.setProgress} key='Sports' pageSize={this.pageSize} country= "in" category='Sports'/>}/>
          <Route path="/Technology" element={<News setProgress={this.setProgress} key='Technology' pageSize={this.pageSize} country= "in" category='Technology'/>}/>
          
        </Routes>
        
      </div>
      </Router>
    )
  }
}


