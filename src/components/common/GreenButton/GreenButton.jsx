import React from 'react'
import { ThemeProvider, Button, MenuItem, createMuiTheme, makeStyles } from '@material-ui/core' 
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#32b482',
        '&:hover': {
            backgroundColor: '#349e76',
            borderColor: '#349e76',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#349e76',
            borderColor: '#349e76',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
        '& .MuiButton-label': {
            color: '#fff',
        }
    },
}))

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
})

const GreenButton = (props) => { 
    const classes = useStyles()

    return <ThemeProvider theme={theme}>
        <Button  
            {...props}
            variant="contained"
            className={[classes.button, props.className ? props.className : undefined].join(' ')}
        > 
            {props.children}
        </Button>
    </ThemeProvider>
}

export default GreenButton