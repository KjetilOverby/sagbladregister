
import Sidebar from '../components/Sidebar';
import { Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
     sidebarWidth: {
         marginLeft: '17em',
         paddingLeft: '2em'
     }
})

const home = () => {
    const classes = useStyles()
    return (
        <div className={classes.sidebarWidth}>
            <Sidebar />
            <Typography variant='h1'>Home Page</Typography>
        </div>
    )
}

export default home