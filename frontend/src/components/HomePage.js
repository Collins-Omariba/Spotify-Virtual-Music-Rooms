import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';
import {Grid, Button, ButtonGroup, Typography} from '@material-ui/core'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomCode: null, 
    }
    this.clearRoomCode = this.clearRoomCode.bind(this)
  }

  async componentDidMount(){
    fetch('/api/user-in-room')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        roomCode: data.code 
      })
    })

  }

  renderHomePage(){
    return(
      <Grid container spacing={3} align='center'>
        <Grid item xs={12}>
          <Typography variant='h3' compact='h3'>
            MUSIFY
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <ButtonGroup disableElevation variant='contained' color='primary'>
              <Button color='primary' to='/join' component={ Link }>Join A Room</Button>
              <Button color='secondary' to='/create' component={ Link }>Create A Room</Button>
            </ButtonGroup>
        </Grid>
      </Grid>
    )
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      
      <Router>
        <Switch>
          <Route exact path='/'  render={() => {
            return this.state.roomCode ? (< Redirect to ={ `/room/${this.state.roomCode}`}/>) : this.renderHomePage()
          }}/>
            

          <Route path='/create' component={CreateRoomPage}></Route>
      
          <Route path='/join' component={RoomJoinPage}></Route>

          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
            }}
          />
        
        </Switch>
      </Router>
      
    )
  }
}

export default HomePage