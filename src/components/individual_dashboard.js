import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import Profile from './ind_dashboard_components/profile';
import Account from './ind_dashboard_components/account';
import Subscription from './ind_dashboard_components/subscription';
import Services from './ind_dashboard_components/services';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/PersonPinSharp';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import ServicesIcon from '@material-ui/icons/RoomService';
import SvgIcon from '@material-ui/core/SvgIcon';
import LogoutIcon from '@material-ui/icons/Lock';
// import popover from '@material-ui/core/Popover/Popover';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import logo from '../img/esgrown.png';
import avatar from '../img/boy.svg';


const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();


  const [open, setOpen] = useState(false);

  //State for Logic page navigation
  const [page, setPage] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userr = JSON.parse(sessionStorage.getItem("key"));
    setUser(userr);
  }, [])

  //Functions to set setPage based on where the user clicks
  const setActPage = () => {
    setPage(0);
  };
  const setProfilePage = () => {
    setPage(1);
  }
  const setSubPage = () => {
    setPage(2);
  }

  const setServicePage = () => {
    setPage(3);
  }

  //Drawer Open and  Close Functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Welcome to Dashboard: {user.name}
            </Typography>
            <div className="row">
              <div >
                <img src={avatar} width="30%"  style={{marginLeft:'500%'}}/>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <div style={{height:'100%', width:'8px', backgroundColor:'#3F51b5'}}></div>
            {/* Place Logo here */}
            <div style={{marginLeft:'20px'}}>
              <img src={logo} width="50%"/>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          </div>
          <Divider />
          <List>
            {
              <ListItem button onClick={setActPage}>
                <ListItemIcon>
                  <SvgIcon color="primary">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary={'Account'} />
              </ListItem>
            }
            {
              <ListItem button onClick={setProfilePage}>
                <ListItemIcon><PersonIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>
            }
            {
              <ListItem button onClick={setSubPage}>
                <ListItemIcon><SubscriptionIcon color="primary" /> </ListItemIcon>
                <ListItemText primary={'Subscription'} />
              </ListItem>
            }
             {
                <List>
                   <ListItem button onClick={setServicePage} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                      <ListItemIcon><ServicesIcon color="primary" /> </ListItemIcon>
                          <ListItemText primary={'Service'} className="dropdown-toggle " />
                          <div className="dropdown-menu" style={{position:'absolute', }}>
                            <a className="dropdown-item " href="#">EAS</a>
                            <a className="dropdown-item" href="#">EFA</a>
                            <a className="dropdown-item" href="#">RM</a>
                            <a className="dropdown-item" href="#">LM</a>
                          </div>               
                   </ListItem>  
              </List>
              
            }
          </List>
          <Divider />
          <List>
            <Link to="/logout" style={{ 'text-decoration': 'none' }}>
              {
                <ListItem button onClick={{}}>
                  <ListItemIcon><LogoutIcon color="primary" /> </ListItemIcon>
                  <ListItemText primary={'Logout'} />
                </ListItem>
              }
            </Link>
          </List>  
        </Drawer>
        <main className={classes.content}>

          {
            (page == 0) ? <Account /> : (page == 1) ? <Profile /> : (page == 2) ? <Subscription /> : (page == 3) ? <Services /> : ''
          }
        </main>
      </div>
    </>
  );

}

  const renderAvatar = () => {
    const avatar = {
        backgroundImage: `url(${avatar})`
    };

    return avatar;
}