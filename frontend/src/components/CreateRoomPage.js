import React, { Component } from 'react'
import {Button,
    Typography,
    Grid, 
    FormHelperText,
    FormControl, 
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Collapse} from '@material-ui/core'

import Alert from "@material-ui/lab/Alert"


import {Link} from 'react-router-dom'





class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  }

    constructor(props) {
      super(props)
    
      this.state = {
         guestCanPause: this.props.guestCanPause,
         votesToSkip:this.props.votesToSkip,
         errorMsg: "",
         successMsg: "",
      }
      this.handleGuestCanPause = this.handleGuestCanPause.bind(this)
      this.handleVotesChange = this.handleVotesChange.bind(this)
      this.handleRoomCreation = this.handleRoomCreation.bind(this)
      this.handleRoomUpdate = this.handleRoomUpdate.bind(this)
    }

    handleVotesChange(e){
      this.setState({
       votesToSkip: e.target.value,
      })
    }

    handleGuestCanPause(e){
      this.setState({
        guestCanPause: e.target.value === "true" ? true : false,
      })
    }

    handleRoomCreation(){
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          votes_to_skip: this.state.votesToSkip,
          guest_can_pause: this.state.guestCanPause,
        }),
      }
      fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push('/room/' + data.code))
    }

    handleRoomUpdate(){
      const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          votes_to_skip: this.state.votesToSkip,
          guest_can_pause: this.state.guestCanPause,
          code: this.props.roomCode,
        }),
      }
      fetch('/api/update-room', requestOptions).then((response) => {
        if (response.ok) {
          this.setState({
            successMsg: "Room Updated Succesfully !!"
          })
        } else {
          this.setState({
            errorMsg: "Error Updating Room !!!!!"
          })
        }
        this.props.updateCallback()
      })
    }


  renderCreateButtons(){
    return(
    <>
    <Grid item xs={12} align="center">
      <Button color="primary" variant="contained" onClick={this.handleRoomCreation}>Create A Room</Button>
    </Grid>
      <br/>
    <Grid item xs={12} align="center">
      <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
    </Grid>
    </>
    )
  }

  renderUpdateButton(){
    return(
    <Grid item xs={12} align="center">
      <Button color="primary" variant="contained" onClick={this.handleRoomUpdate}>Update The Room</Button>
    </Grid>)

  }

  render() {

    const title = this.props.update ? "Update The Room" :  "Create A room"
    const createAndUpdateButtons = this.props.update ? this.renderUpdateButton() : this.renderCreateButtons()

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse in={this.state.errorMsg != ""  || this.state.successMsg != ""}>
              {this.state.successMsg != "" ? (
                <Alert 
                severity='success'
                onClose={() => {
                  this.setState({ successMsg: ""})
                }}
                >
                  {this.state.successMsg}
                </Alert>
              ) : (
                <Alert
                severity='error'
                onClose={() => {
                  this.setState({ errorMsg: ""})
                }}
                >
                  {this.state.errorMsg}
                </Alert>
              
              )}
          </Collapse>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset"  >

            <FormHelperText>
              <div align="center">
                Guest Control of Playback
              </div>
            </FormHelperText>

            <RadioGroup 
              row 
              defaultValue={this.props.guestCanPause.toString()} 
              onChange={this.handleGuestCanPause}>

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
              <TextField required={true} 
              type="number" 
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style:{textAlign: "center"}
              }}

              />
              <FormHelperText>
                <div align="center"> Votes To Skip song</div>
              </FormHelperText>
            </FormControl>

            {createAndUpdateButtons}
           
        </Grid>
      </Grid>
    )
  }
}

export default CreateRoomPage