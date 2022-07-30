import React, { Component} from 'react'
import { Grid, Button, Typography } from "@material-ui/core"
import CreateRoomPage from './CreateRoomPage'

class Room extends Component {
    constructor(props) {
      super(props)
      this.state = {
         votesToSkip: 2,
         guestCanPause: false,
         isHost: false,
         showSettings: false,
      }
      this.roomCode = this.props.match.params.roomCode
      this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
      this.updateShowsettings = this.updateShowsettings.bind(this)
      this.renderSettingsButton = this.renderSettingsButton.bind(this)
      this.rendersettings = this.rendersettings.bind(this)
      this.getRoomDetails = this.getRoomDetails.bind(this)
      this.getRoomDetails()
    }




    getRoomDetails(){
        fetch('/api/get-room' + '?code=' + this.roomCode)
        .then((response) => {
          if (!response.ok) {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
          }
          return response.json()
        })
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    }

  
    leaveButtonPressed() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
      fetch("/api/leave-room", requestOptions).then((_response) => {
        this.props.leaveRoomCallback()
        this.props.history.push("/")
      })
    }

    updateShowsettings(value){
        this.setState({
          showSettings: value,
        })
    }

    rendersettings(){
      return(
      <Grid container spacing={1} align='center'>
        <Grid item xs={12}  >
          <CreateRoomPage 
           update={true}
           votesToSkip={this.state.votesToSkip} 
           guestCanPause={this.state.guestCanPause} 
           roomCode={this.roomCode}
           updateCallback={this.getRoomDetails}
           />
        </Grid>
        <Grid item xs={12}>
          <Button 
          variant='contained'
          color='secondary'
          onClick={() => this.updateShowsettings(false)}
          >
            CLOSE
          </Button>
        </Grid>
      </Grid>
      )
    }

    renderSettingsButton(){
      return (
        <Grid item xs={12} align='center'>
         <Button variant='contained'
          color='primary' 
          onClick={() => this.updateShowsettings(true)}> 
          SETTINGS
         </Button>
        </Grid>
      )
    }

  render() {
    if(this.state.showSettings){
        return this.rendersettings()
    }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
           Room Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes Inorder To Skip Track: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Can A Guest Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Are You The Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>

        {this.state.isHost ? this.renderSettingsButton(): null}

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveButtonPressed}
          >
            Leave The Room
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default Room