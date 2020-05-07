import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [openCollapse, setOpenCollapse] = React.useState(false);    
  const [openCollapse2, setOpenCollapse2] = React.useState(false);    

  function handleOpenSettings(){
     setOpenCollapse(!openCollapse);
  }
  function handleOpenSettings2(){
     setOpenCollapse2(!openCollapse2);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      <Link href='/home'>
        <ListItem button>
        <ListItemIcon>{<DashboardIcon /> }</ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        </Link>
        <Link href='/service'>
        <ListItem button>
        <ListItemIcon>{<LocalShippingIcon /> }</ListItemIcon>
          <ListItemText>Service</ListItemText>
        </ListItem>
        </Link>
        {/* {['Dashboard', 'Service', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
      <Divider />
     
     
            <ListItem button onClick={handleOpenSettings}>
              <ListItemIcon>
               <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary="Kanefusa" />
              {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <Link href='/kanefusa/k2.2-3.6'>
              <ListItem button className={classes.nested}>
                
                <ListItemText inset primary="2.2 - 3.6" />
              </ListItem>
              </Link>
              <Link href='/kanefusa/k2.4-3.8'>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="2.4 - 3.8" />
              </ListItem>
              </Link>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="2.6 - 4.0" />
              </ListItem>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="2.8 - 4.2" />
              </ListItem>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="3.0 - 4.4" />
              </ListItem>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="3.2 - 4.6" />
              </ListItem>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="VS-66 høyre" />
              </ListItem>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="VS-66 venstre" />
                
              </ListItem>
              <ListItem button className={classes.nested}>
               
                <ListItemText inset primary="N-blad" />
              </ListItem>

              <ListItem button className={classes.nested}>
               
               <ListItemText inset primary="VS-66 høyre F" />
             </ListItem>
             <ListItem button className={classes.nested}>
              
               <ListItemText inset primary="VS-66 venstre F" />
               
             </ListItem>
              
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenSettings2}>
              <ListItemIcon>
               <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary="Nessjø" />
              {openCollapse2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                
                <ListItemText inset primary="2.8 - 4.2" />
              </ListItem>
             
            
              <ListItem button className={classes.nested}>
               
               <ListItemText inset primary="VS-66 høyre" />
             </ListItem>
             <ListItem button className={classes.nested}>
              
               <ListItemText inset primary="VS-66 venstre" />
               
             </ListItem>
              
            </List>
          </Collapse>
       


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sagbladregister
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
       
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
