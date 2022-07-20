import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes, Link, Redirect} from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';


class HomePage extends Component {
  constructor(props) {
    super(props)
  
  }
  render() {
    return (
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<p>This is the homepage</p>}/>
            
          <Route path='/create' element={<CreateRoomPage />} />
      
          <Route path='/join' element={<RoomJoinPage/>}/>
        </Routes>
      </Router>
      </div>
    )
  }
}

export default HomePage