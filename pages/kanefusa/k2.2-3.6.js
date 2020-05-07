import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import Sidebar from '../../components/Sidebar.jsx';
import BladeList from '../../components/BladeList';

const useStyles = makeStyles(theme => ({
     sidebarWidth: theme.sidebarWidth.main,
     [theme.breakpoints.down('xs')]: {
        sidebarWidth: theme.sidebarWidthMobile.main
       },
       header: {
           background: theme.palette.appColor1.main,
           padding: '.5em',
           color: 'white'
       },
       bladeListContainer: {
        margin: '2rem 2rem'
       }
}))
const k2236 = ({ data }) => {
    console.log(data);
    let superData = data;
const classes = useStyles()
return (
<div className={classes.sidebarWidth}>
    <Sidebar />
    <Typography className={classes.header} variant='h4'>Kanefusa 2.2 - 3.6</Typography>
    
   
   
           <div className={classes.bladeListContainer}>
             <BladeList data={superData} />
           </div>
       
 
</div>
)
}

k2236.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/blades');
    const json = await res.json();
    
    return { data: json };
  };
  
  

export default k2236