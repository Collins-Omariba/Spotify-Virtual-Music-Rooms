import React, { Component } from 'react'
import {Button,
    Typography,
    Grid, 
    FormHelperText,
    FormControl, 
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField} from '@material-ui/core'

import {Link} from 'react-router-dom'





class CreateRoomPage extends Component {
  defaultVotes = 1

    constructor(props) {
      super(props)
    
      this.state = {
         GuestCanPause: true,
         VotesToSkip:this.defaultVotes,
      }
      this.handleGuestCanPause = this.handleGuestCanPause.bind(this)
      this.handleVotesChange = this.handleVotesChange.bind(this)
      this.handleRoomCreation = this.handleRoomCreation.bind(this)
    }

    handleVotesChange(e){
      this.setState({
       VotesToSkip: e.target.value,
      })
    }

    handleGuestCanPause(e){
      this.setState({
        GuestCanPause: e.target.value === "true" ? true : false,
      })
    }

    handleRoomCreation(){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          votes_to_skip: this.state.VotesToSkip,
          guest_can_pause: this.state.GuestCanPause,
        }),
      }
      fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push('/room/' + data.code))
    }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset"  >

            <FormHelperText>
              <div align="center">
                Guest Control of Playback
              </div>
            </FormHelperText>

            <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPause}>

              <FormControlLabel
              value="true"
               control={<Radio color="primary"/>}
               label="Play/Pause"
               labelPlacement="bottom"
               />

              <FormControlLabel
              value="false"
               control={<Radio color="secondary"/>}
               label="No Control"
               labelPlacement="bottom"
               />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
            <FormControl>
              <TextField required="true" 
              type="number" 
              onChange={this.handleVotesChange}
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style:{textAlign: "center"}
              }}

              />
              <FormHelperText>
                <div align="center"> Votes To Skip song</div>
              </FormHelperText>
            </FormControl>

            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={this.handleRoomCreation}>Create A Room</Button>
            </Grid>

            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default CreateRoomPage