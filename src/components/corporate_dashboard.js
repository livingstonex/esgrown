import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar';
import Profile from './corp_dashboard_components/profile';
import Account from './corp_dashboard_components/account';
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
import SvgIcon from '@material-ui/core/SvgIcon';
import LogoutIcon from '@material-ui/icons/Lock';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import BusinessIcon from '@material-ui/icons/Business';
import logo from '../img/esgrown.png';

import Jobs from './corp_dashboard_components/job/jobs';
import Subscriptions from './corp_dashboard_components/subscriptions/subscriptions';
import CorpServices from './corp_dashboard_components/services/services';
import CorpExercises from './corp_dashboard_components/exercises/exercise';
import Staff from './corp_dashboard_components/staff/staff';
import ExcerciseRanking from './corp_dashboard_components/staff/excercise_rankings';
import ContentCreationPage from './corp_dashboard_components/services/content_rm/rm_content';
import RMExerciseCreationPage from './corp_dashboard_components/exercises/exercise';
import {logout} from './logot';



const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#53a6e7',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // co
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
    backgroundColor: '#f5f5f5',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#f5f5f5',
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
  }, []);


  //Functions to set setPage based on where the user clicks
  const setActPage = () => {
    setPage(0);
  };
  const setProfilePage = () => {
    setPage(1);
  }

  const setJobPage = () => {
    setPage(2);
  }
  const setSubPage = () => {
    setPage(3)
  }
  const setSrvPage = () => {
    setPage(4);
  }
  const setExPage = () => {
    setPage(5);
  }
  const setStaff = () => {
    setPage(6)
  }
  const setExRanking = () => {
    setPage(7)
  }
  const setContentCreation = () => {
    setPage(8)
  }
  const setRMExerciseCreation = () => {
    setPage(9)
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
      <div style={{ backgroundColor: '#FFFFFF' }}>
        {/* <CssBaseline /> */}
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
            <div style={{ height: '100%', width: '25px', backgroundColor: '#53a6e7' }}></div>
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
              <span style={{ backgroundColor: 'red' }}>
                <ListItem button onClick={setActPage}>
                  <ListItemIcon>
                    {
                      page === 0 ?
                        <><SvgIcon color="primary">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </SvgIcon>
                        </>
                        :
                        <>
                          <SvgIcon color="">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                          </SvgIcon>
                        </>
                    }

                  </ListItemIcon>
                  {
                    page === 0 ?
                      <><ListItemText primary={'Account'} /></>
                      :
                      <><ListItemText secondary={'Account'} /></>
                  }
                </ListItem>
              </span>
            }
            {
              <ListItem button onClick={setProfilePage}>
                <ListItemIcon>
                  {
                    page === 1 ? <><PersonIcon color="primary" /></>
                      :
                      <><PersonIcon color="" /></>
                  }

                </ListItemIcon>
                {
                  page === 1 ?
                    <><ListItemText primary={'Profile'} /></>
                    :
                    <><ListItemText secondary={'Profile'} /></>
                }
              </ListItem>
            }
            {
              <ListItem button onClick={setSubPage}>
                <ListItemIcon>
                  {
                    page === 3 ? <> <SubscriptionsIcon color="primary" />  </>
                      :
                      <> <SubscriptionsIcon color="" />  </>
                  }
                </ListItemIcon>
                {
                  page === 3 ?
                    <><ListItemText primary={'Subscription'} /></>
                    :
                    <><ListItemText secondary={'Subscription'} /></>
                }
              </ListItem>
            }
            {
              <ListItem button onClick={setSrvPage}>
                <ListItemIcon>
                  {
                    page === 4 ? <> <RoomServiceIcon color="primary" />   </>
                      :
                      <> <RoomServiceIcon color="" /></>
                  }
                </ListItemIcon>
                {
                  page === 4 ?
                    <><ListItemText primary={'Services'} /></>
                    :
                    <><ListItemText secondary={'Services'} /></>
                }
              </ListItem>
            }
            {/* {
              <ListItem button onClick={setExPage}>
                <ListItemIcon>
                  {
                    page === 5 ? <> <AssessmentIcon color="primary" /> </>
                      :
                      <> <AssessmentIcon color="" /> </>
                  }
                </ListItemIcon>
                {
                  page === 5 ?
                    <><ListItemText primary={'Excercises'} /></>
                    :
                    <><ListItemText secondary={'Exercises'} /></>
                }
              </ListItem>
            } */}

            {/* {
              <ListItem button onClick={setStaff}>
                {user.org_type === "school" ?
                  <>
                    <ListItemIcon>
                      {
                        page === 6 ? <> <SchoolIcon color="primary" /> </>
                          :
                          <> <SchoolIcon color="" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 6 ?
                        <><ListItemText primary={'Teachers'} /></>
                        :
                        <><ListItemText secondary={'Teachers'} /></>
                    }
                  </>
                  :
                  <>
                    <ListItemIcon>
                      {
                        page === 6 ? <> <BusinessIcon color="primary" /> </>
                          :
                          <> <BusinessIcon color="primary" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 6 ?
                        <><ListItemText primary={'Staff'} /></>
                        :
                        <><ListItemText secondary={'Staff'} /></>
                    }
                  </>
                }

              </ListItem>
            } */}
          </List>
          <Divider />
          <List>
              {
                <ListItem button onClick={ ()=>logout()}>
                  <ListItemIcon>
                    <LogoutIcon color="" />
                  </ListItemIcon>
                  <ListItemText secondary={'Logout'} />
                </ListItem>
              }
          </List>
        </Drawer>
        {/* <main> */}

        {
          (page === 0) ? <Account /> : (page === 1) ? <Profile /> : (page === 2) ? <Jobs contentCreation={setContentCreation} exerciseCreation={setRMExerciseCreation} /> : (page === 3) ? <Subscriptions /> : (page === 4) ? <CorpServices job={setJobPage} staff={setStaff} /> : (page === 5) ? <CorpExercises /> : (page === 6) ? <Staff ex_rankingpage={setExRanking} /> : (page === 7) ? <ExcerciseRanking /> : (page === 8) ? <ContentCreationPage /> :(page ==9) ? <RMExerciseCreationPage />:""
        }
        {/* </main> */}
      </div>
    </>
  );
}
