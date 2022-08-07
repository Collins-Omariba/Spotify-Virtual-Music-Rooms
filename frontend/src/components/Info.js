import React , { useState, useEffect} from "react"
import {Grid, Button, Typography, IconButton} from "@material-ui/core"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBeforeTwoTone"
import NavigateNextIcon from "@material-ui/icons/NavigateNextTwoTone"
import { Link } from "react-router-dom"

const pages = {
    JOIN: "pages.join",
    CREATE: "pages.create"
}


function Info(props) {

    const [page, setPage] = useState(pages.JOIN)

  function joinInfo() {
    return (
        <Grid>
    
            <Typography component='h4' variant='h4' color="secondary">
            Creating a room
            </Typography>

            <Typography variant='body1' >
            A room can be created by clicking the create room button and choosing
            whether guests of the room can be allowed to play/pause
            and the number of votes required to skip a song .

            After creating a room the host can still change whether 
            guests can play/pause and the votes required to skip by clicking the settings button
            </Typography>
        </Grid>
    )
  }

  function createInfo(){
    return (
        <Grid>
    
        <Typography component='h4' variant='h4' color="primary">
        Joining a room 
        </Typography>

        <Typography variant='body1' >
        A host can share their room code to guests who
    can click the join room button and type/paste 
    the room code to the shown box ,then click join.
        </Typography>
    </Grid>
    )
  } 

  return (
    <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
            <Typography component='h4' variant='h4' color="secondary">
                WHAT IS MUSIFY ?
            </Typography>
            <Typography variant='body1' >
                Musify is a  web application that enables users
                in a virtual room to control music being played on a Spotify account
                ,allowing them to skip music (based on votes set by the host ) and play/pause.
                It can be used in e.g.  house parties ,
                so that all  attendees can have control over music being played thus 
                ensuring  maximumum music enjoyment.
            </Typography>
        </Grid>

       
        <Grid item xs={12} align='center' >
            <Typography variant='body1'>
                {page === pages.JOIN ? joinInfo() : createInfo() }
            </Typography>
        </Grid>

        <Grid item xs={12} align='center'>
            <IconButton color="secondary" onClick={() => {
                page === pages.CREATE ? setPage(pages.JOIN) :  setPage(pages.CREATE)
            }}>
                {page === pages.CREATE ? <NavigateBeforeIcon/> :  <NavigateNextIcon/> }
            </IconButton>
        </Grid>

        <Grid item xs={12} align="center">
                <Button
                color='secondary'
                variant="contained"
                to='/' 
                component={Link}
                 >
                  BACK
                  </Button>
        </Grid>
            
    </Grid>
  )
}

export default Info

