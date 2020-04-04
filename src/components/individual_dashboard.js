import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import Profile from './ind_dashboard_components/main-pages/profile';
import Account from './ind_dashboard_components/main-pages/account';
import Subscription from './ind_dashboard_components/main-pages/subscription';
// import Services from './ind_dashboard_components/main-pages/services';

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
import AssessmentIcon from '@material-ui/icons/Assessment';
import SvgIcon from '@material-ui/core/SvgIcon';
import LogoutIcon from '@material-ui/icons/Lock';
// import popover from '@material-ui/core/Popover/Popover';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import logo from '../img/esgrown.png';
import avatar from '../img/boy.svg';
import bell from '../img/bell.svg';

//Service Pages
import EASServicePage from './ind_dashboard_components/services-components/eas_service_page';
import EFAServicePage from './ind_dashboard_components/services-components/efa_service_page';
import LMServicePage from './ind_dashboard_components/services-components/lm_service_page';
import RMServicePage from './ind_dashboard_components/services-components/rm_service_page';

//Exercise pages
import EASExercise from './ind_dashboard_components/exercises/eas_exercise';



//Dropdown import setup
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
import MoneyIcon from '@material-ui/icons/Money';
import PersoIcon from '@material-ui/icons/Person';
import EduIcon from '@material-ui/icons/CastForEducation';
import PeopleIcon from '@material-ui/icons/People';



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


//Dropdown Setup
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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

  const setEasServicePage = () => {
    setPage(3);
    handleClose();
  }

  const setEfaServicePage = () => {
    setPage(4);
    handleClose();
  }

  const setRmServicePage = () => {
    setPage(5);
    handleClose();
  }

  const setLmServicePage = () => {
    setPage(6);
    handleClose();
  }

  const setEasExercisePage = () => {
    setPage(7);
    handleClose();

  }
  const setEfaExercisePage = () => {
    setPage(8);
    handleClose();

  }
  const setLmExercisePage = () => {
    setPage(9);
    handleClose();

  }
  const setRmExercisePage = () => {
    setPage(10);
    handleClose();

  }

  //Drawer Open and  Close Functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  //dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const getClicks = event => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Close = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <div className={classes.root}>y
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
            <Typography variant="" wrap>
              Welcome: {user.name}
            </Typography>
            <div className="row d-flex" style={{ width: '100%', position: 'relative' }}>
              <div className="row" style={{ marginLeft: '83%' }}>
                <div className="dropdown" style={{ cursor: 'pointer' }}>
                  <a data-toggle="dropdown">
                    <img src={bell} height="20px" className="mt-1" />
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="">update1</a>
                    <a class="dropdown-item" href="">update2</a>
                    <a class="dropdown-item" href="">update3</a>
                    <a class="dropdown-item" href="">update4</a>  
                  </div>
                </div>

                {/* <div style={{ width: '20px' }}></div> */}

                <div className="dropdown" style={{ cursor: 'pointer' }}>
                  <a data-toggle="dropdown">
                    <img src={avatar} width="30%" height="30px" />
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" onClick={setActPage}> Accounts</a>
                    <a class="dropdown-item" href="#" onClick={setProfilePage}>Profile</a>
                    <a class="dropdown-item" href="#" onClick={setSubPage}>Subscription</a>
                    <a class="dropdown-item" href="#" onClick={setEasServicePage}>EAS</a>
                    <a class="dropdown-item" href="#" onClick={setEfaServicePage}>EFA</a>
                    <a class="dropdown-item" href="#" onClick={setRmServicePage}>RM</a>
                    <a class="dropdown-item" href="#" onClick={setLmServicePage}>LM</a>
                  </div>
                </div>
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
          <div className={classes.toolbar} style={{ marginLeft: '-10px' }}>
            <div style={{ height: '100%', width: '25px', backgroundColor: '#3F51b5' }}></div>
            {/* Place Logo here */}
            <div style={{ marginLeft: '60px' }}>
              <img src={logo} width="80%" />
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
                {/* List Item for Services */}
                <ListItem
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}

                >
                  <ListItemIcon>
                    <ServicesIcon color="primary" />
                </ListItemIcon>
                  <ListItemText primary={'Services'} />
                </ListItem>

                {/* ListItem Menu for Services */}
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem onClick={setEasServicePage}>
                    <ListItemIcon>
                      <EduIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="EAS Services" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setEfaServicePage}>
                    <ListItemIcon>
                      <MoneyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="EFA Services" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setRmServicePage}>
                    <ListItemIcon>
                      <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="RM Services" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setLmServicePage}>
                    <ListItemIcon>
                      <PersoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="LM Services" />
                  </StyledMenuItem>

                </StyledMenu>
              </List>
            }

            {
              <List>
                <ListItem
                  variant="contained"
                  color="primary"
                  onClick={getClicks}
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemIcon><AssessmentIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Exercises" />
                </ListItem>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorElement}
                  keepMounted
                  open={Boolean(anchorElement)}
                  onClose={Close}
                >
                  <StyledMenuItem onClick={setEasExercisePage}>
                    <ListItemIcon>
                      <EduIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="EAS Exercises" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setEfaExercisePage}>
                    <ListItemIcon>
                      <MoneyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="EFA Exercises" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setRmExercisePage}>
                    <ListItemIcon>
                      <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="RM Exercises" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setLmExercisePage}>
                    <ListItemIcon>
                      <PersoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="LM Exercises" />
                  </StyledMenuItem>

                </StyledMenu>


              </List>
            }

            {/* {
              <List>

                <ListItem
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClicks}
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemIcon><ServicesIcon color="primary" /> </ListItemIcon>
                  <ListItemText primary={'Exercises'} />
                </ListItem>


                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem onClick={setEasExercisePage}>
                    <ListItemIcon>
                      <EduIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="EAS Exercises" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setEfaExercisePage}>
                    <ListItemIcon>
                      <MoneyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="EFA Exercises" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setRmExercisePage}>
                    <ListItemIcon>
                      <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="RM Exercises" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setLmExercisePage}>
                    <ListItemIcon>
                      <PersoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="LM Exercises" />
                  </StyledMenuItem>

                </StyledMenu>
              </List>

            } */}

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
            (page == 0) ? <Account /> : (page == 1) ? <Profile /> : (page == 2) ? <Subscription /> : (page == 3) ? <EASServicePage /> : (page == 4) ? <EFAServicePage /> : (page == 5) ? <RMServicePage /> : (page == 6) ? <LMServicePage /> : (page == 7) ? <EASExercise />:''}
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