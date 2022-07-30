import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';
import {Grid, Button, ButtonGroup, Typography, ThemeProvider, createTheme} from '@material-ui/core'
import { blueGrey, green , lightBlue, lightGreen, purple } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue,
  }
})

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
      <ThemeProvider theme={theme}>
      <Grid container spacing={3} align='center'>
        <Grid item xs={12}>
          <Typography variant='h3' compact='h3'>
            MUSIFY
          </Typography>
        </Grid>
        <Grid item xs={12}>
           
            <Grid item xs={12} align="center">
            
                <Button
                color='primary'
                 variant="contained"
                  to='/join'  
                  component={ Link }
                  >
                    Join A Room
                  </Button>
                
            </Grid>
              <br/>
            <Grid item xs={12} align="center">
                <Button
                color='secondary'
                variant="contained"
                to='/create' 
                component={Link}
                 >
                  Create A Room
                  </Button>
            </Grid>
            
        </Grid>
      </Grid>
      </ThemeProvider>
    )
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    )
  }
}

export default HomePage