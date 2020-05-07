import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import Sidebar from '../../components/Sidebar.jsx'

const useStyles = makeStyles(theme => ({
     sidebarWidth: theme.sidebarWidth.main,
     [theme.breakpoints.down('xs')]: {
        sidebarWidth: theme.sidebarWidthMobile.main
       },
       header: {
           background: theme.palette.appColor1.main,
           padding: '.5em',
           color: 'white'
       }
}))
const k2438 = ({ blades }) => {
    console.log(blades);
    
const classes = useStyles()
return (
<div className={classes.sidebarWidth}>
    <Sidebar />
    <Typography className={classes.header} variant='h4'>Kanefusa 2.4 - 3.8</Typography>
    <h1>List of blades</h1>
   
</div>
)
}

// k2438.getInitialProps = async () => {
//     const res = await fetch('http://localhost:3000/api/blades');
//     const { data } = await res.json();
    
//     return { blades: data };
//   };
  
  

export default k2438