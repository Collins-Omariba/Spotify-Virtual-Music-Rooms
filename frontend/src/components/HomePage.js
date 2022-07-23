import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';


class HomePage extends Component {
  constructor(props) {
    super(props)
  
  }
  render() {
    return (
      
      <Router>
        <Switch>
          <Route exact path='/' >
            <p>This is the homepage</p>
            </Route>

          <Route path='/create' component={CreateRoomPage}></Route>
      
          <Route path='/join' component={RoomJoinPage}></Route>

          <Route path='/room/roomCode' component={Room}></Route>
        
        </Switch>
      </Router>
      
    )
  }
}

export default HomePage