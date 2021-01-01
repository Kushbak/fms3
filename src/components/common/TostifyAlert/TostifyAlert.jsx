import React, { useState } from 'react' 
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar, makeStyles } from '@material-ui/core'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const TostifyAlert = props => {

    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        props.setMsg(['', true])
        setOpen(false)
    }

    return ( 
        <Snackbar open={!!props.displayedMsg} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity} >
                {props.displayedMsg}
            </Alert>
        </Snackbar>
    ) 
}

export default TostifyAlert