import Sidebar from '../components/Sidebar';
import { Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
     sidebarWidth: {
         marginLeft: '17em',
         paddingLeft: '2em'
     }
})

const service = () => {
    const classes = useStyles()
    return (
        <div className={classes.sidebarWidth}>
            <Sidebar />
            <Typography variant='h1'>service Page</Typography>
        </div>
    )
}

export default service