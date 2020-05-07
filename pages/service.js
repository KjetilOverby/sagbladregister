import Sidebar from '../components/Sidebar';
import { Typography, makeStyles } from '@material-ui/core';
import theme from '../src/theme';
const useStyles = makeStyles({
     sidebarWidth: theme.sidebarWidth.main,
     [theme.breakpoints.down('xs')]: {
      sidebarWidth: theme.sidebarWidthMobile.main
     },
})

const service = () => {
    const classes = useStyles()
    return (
        <div className={classes.sidebarWidth}>
            <Sidebar />
            <Typography variant='h4'>service Page</Typography>
        </div>
    )
}

export default service