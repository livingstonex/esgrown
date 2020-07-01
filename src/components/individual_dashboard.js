import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import NavBar from './navbar';
import Profile from './ind_dashboard_components/main-pages/profile';
import Account from './ind_dashboard_components/main-pages/account';
import Subscription from './ind_dashboard_components/main-pages/subscription';
import { logout } from './logot';
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
import Badge from '@material-ui/core/Badge';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import logo from '../img/esgrown.png';
import avatar from '../img/boy.svg';
import bell from '../img/bell.svg';

//Service Pages
import EASServicePage from './ind_dashboard_components/services-components/eas_service_page';
import EFAServicePage from './ind_dashboard_components/services-components/efa_service_page';
import LMServicePage from './ind_dashboard_components/services-components/lm_service_page';
import RMServicePage from './ind_dashboard_components/services-components/rm_service_page';
import CompetenceMgt from './ind_dashboard_components/services-components/compt-mgt-service';

//Exercise page
import Exercises from './ind_dashboard_components/exercises/exercise';



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

import QuestionComponent from './ind_dashboard_components/exercises/rmquestioncomponent';



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
    paddingTop: theme.spacing(6),
    // paddingBottom: theme.spacing(0),
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

  //state for notifications
  const [easNotification, setEasNotification] = useState([])
  const [efaNotification, setEfaNotification] = useState([])
  const [lmNotification, setLmNotification] = useState([])
  const [rmNotification, setRmNotification] = useState([])
  const [exNotification, setExNotification] = useState([])
  const [count, setCount] = useState(true);

  const [RMEx, setRMEx] = useState({});


  //get all notifications from api


  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('key'));
    const notify = JSON.parse(localStorage.getItem('notify'));

    if (notify == 'loaded') {

    } else {
      //get eas subscription
      axios.get(`http://18.188.101.36/subscriptioneas/${userData.id}`)
        .then(res => {

          if (res.data.length > 0) {
            if (res.data[0].sub_status) {

              const lastLogin = {
                "lastLogin": userData.lastLogin
              }
              //get eas notifications
              axios.post(`http://18.188.101.36/servicecontenteas/notification`, lastLogin)
                .then(res => {
                  setEasNotification(res.data)
                })
                .catch(err => console.log(err));

              //get eas exercises
              axios.post(`http://18.188.101.36/excercise/notification`, lastLogin)
                .then(res => {

                  const easEx = res.data.filter(ex => {
                    return ex.service === 'EAS'
                  })
                  setExNotification(easEx);


                })
                .catch(err => console.log(err))
            }

          }
        })
        .catch(err => console.log(err));

      //get efa subscription
      axios.get(`http://18.188.101.36/subscriptionefa/${userData.id}`)
        .then(res => {

          if (res.data.length > 0) {
            if (res.data[0].sub_status) {

              const lastLogin = {
                "lastLogin": userData.lastLogin
              }
              // get efa notifications
              axios.post(`http://18.188.101.36/servicecontentefa/notification`, lastLogin)
                .then(res => {
                  setEfaNotification(res.data);


                })
                .catch(err => console.log(err));

              //get efa exercises
              axios.post(`http://18.188.101.36/excercise/notification`, lastLogin)
                .then(res => {

                  const efaEx = res.data.filter(ex => {
                    return ex.service === 'EFA'
                  })
                  setExNotification(efaEx);

                })
                .catch(err => console.log(err))

            }

          }
        }).catch(err => console.log(err));


      //get lm subscription
      axios.get(`http://18.188.101.36/subscriptionlm/${userData.id}`)
        .then(res => {

          if (res.data.length > 0) {
            if (res.data[0].sub_status) {

              const lastLogin = {
                "lastLogin": userData.lastLogin
              }
              //get lm notifications
              axios.post(`http://18.188.101.36/servicecontentlm/notification`, lastLogin)
                .then(res => {
                  setLmNotification(res.data)

                })
                .catch(err => console.log(err));

              //get lm exercises
              axios.post(`http://18.188.101.36/excercise/notification`, lastLogin)
                .then(res => {

                  const lmEx = res.data.filter(ex => {
                    return ex.service === 'LM'
                  })
                  setExNotification(lmEx);

                })
                .catch(err => console.log(err))

            }

          }
        })
        .catch(err => console.log(err))


      //get rm subscription
      axios.get(`http://18.188.101.36/subscriptionrm/${userData.id}`)
        .then(res => {

          if (res.data.length > 0) {
            if (res.data[0].sub_status) {

              const lastLogin = {
                "lastLogin": userData.lastLogin
              }
              // get rm notifications
              axios.post(`http://18.188.101.36/servicecontentrm/notification`, lastLogin)
                .then(res => {

                  setRmNotification(res.data)

                })
                .catch(err => console.log(err));

              //get rm exercises
              axios.post(`http://18.188.101.36/excercise/notification`, lastLogin)
                .then(res => {

                  const rmEx = res.data.filter(ex => {
                    return ex.service === 'RM'
                  })
                  setExNotification(rmEx);



                })
                .catch(err => console.log(err))

            }

          }
        })
        .catch(err => console.log(err))

    }


  }, [])
  console.log(new Date(1591219434900).toDateString())

  let total;
  if (count == true) {
    total = easNotification.length + efaNotification.length + lmNotification.length + rmNotification.length + exNotification.length;
  } else {
    total = 0
  }

  const clickNotification = (e) => {

    localStorage.setItem('notify', JSON.stringify('loaded'));

    const service = e.target.getAttribute('data-service');

    if (service == 'EAS') {

      const id = e.target.getAttribute('data-id');

      const newEAS = easNotification.filter(eas => {
        return eas._id !== id
      })

      setEasNotification(newEAS);

      console.log(newEAS)

      setPage(3);

    } else if (service == 'EFA') {
      const id = e.target.getAttribute('data-id');

      const efa = efaNotification.filter(efa => {
        return efa._id !== id
      });

      setEfaNotification(efa)

      setPage(4);

    } else if (service == 'LM') {
      const id = e.target.getAttribute('data-id');

      const lm = lmNotification.filter(lm => {
        return lm._id !== id;
      })
      setLmNotification(lm)
      setPage(6);

    } else if (service == 'RM') {
      const id = e.target.getAttribute('data-id');

      const rm = rmNotification.filter(rm => {
        return rm._id !== id
      })
      setRmNotification(rm)
      setPage(5);

    } else if (service == 'EX') {
      const id = e.target.getAttribute('data-id');

      const ex = exNotification.filter(ex => {
        return ex._id !== id
      })
      setExNotification(ex);
      setPage(7);
    }

  }


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

  const setExercisePage = () => {
    setPage(7);
    handleClose();

  }
  const setEfaExercisePage = () => {
    setPage(8);
    handleClose();

  }
  // const setLmExercisePage = () => {
  //   setPage(9);
  //   handleClose();

  // }
  const setRmExercisePage = (exercise) => {
    setRMEx(exercise)
    setPage(10);
    handleClose();

  }

  const setComptMgtPage = () => {
    setPage(11)
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
            <Typography variant="" wrap>
              Welcome: {user.name}
            </Typography>
            <div className="row d-flex" style={{ width: '100%', position: 'relative', overFlow: 'scroll' }}>
              <div className="row" style={{ marginLeft: '83%' }}>
                <div className="dropdown" style={{ cursor: 'pointer' }}>
                  <button className="btn btn" drop="left" data-toggle="dropdown">

                    <Badge color="secondary" onClick={() => setCount(false)} badgeContent={total}>
                      <img src={bell} height="20px" className="mt-1" style={{ position: 'relative', zIndex: '.9' }} />
                    </Badge>
                  </button>
                  <div class="dropdown-menu">

                    <a class="dropdown-item" href="">update1</a>
                    <a class="dropdown-item" href="">update2</a>
                    <a class="dropdown-item" href="">update3</a>
                    <a class="dropdown-item" href="">update4</a>

                    {easNotification.map(eas => {
                      return (
                        <p class="dropdown-item" data-service="EAS" data-id={eas._id} onClick={clickNotification}>{eas.title}</p>
                      )
                    })}
                    <Divider />
                    {efaNotification.map(efa => {
                      return (
                        <p class="dropdown-item" data-service="EFA" data-id={efa._id} onClick={clickNotification}>{efa.title}</p>
                      );
                    })}

                    <Divider />
                    {rmNotification.map(rm => {
                      return (
                        <p class="dropdown-item" data-service="RM" data-id={rm._id} onClick={clickNotification}>{rm.title}</p>
                      );
                    })}
                    <Divider />
                    {lmNotification.map(lm => {

                      return (
                        <p class="dropdown-item" data-service="LM" data-id={lm._id} onClick={clickNotification}>{lm.title}</p>
                      );
                    })}
                    <Divider />
                    {exNotification.map(ex => {
                      return (
                        <p class="dropdown-item" data-service="EX" data-id={ex._id} onClick={clickNotification}>{ex.title}</p>
                      );
                    })}
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
              <ListItem button onClick={setActPage}>
                <ListItemIcon>
                  {
                    page === 0 ?
                      <>
                        <SvgIcon color="primary">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </SvgIcon>
                      </> :
                      <>
                        <SvgIcon color="">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </SvgIcon>
                      </>
                  }
                </ListItemIcon>
                {
                  page == 0 ? <> <ListItemText primary={'Account'} /> </> : <> <ListItemText secondary={'Account'} /> </>
                }
              </ListItem>
            }
            {
              <ListItem button onClick={setProfilePage}>
                <ListItemIcon>
                  {
                    page === 1 ? <> <PersonIcon color="primary" /> </> : <> <PersonIcon color="" /> </>
                  }
                </ListItemIcon>
                {
                  page === 1 ? <> <ListItemText primary={'Profile'} /> </> : <> <ListItemText secondary={'Profile'} /> </>
                }
              </ListItem>
            }
            {
              <ListItem button onClick={setSubPage}>
                <ListItemIcon>
                  {
                    page === 2 ? <> <SubscriptionIcon color="primary" /> </> : <> <SubscriptionIcon color="" /> </>
                  }
                </ListItemIcon>
                {
                  page === 2 ? <> <ListItemText primary={'Subscription'} /> </> : <> <ListItemText secondary={'Subscription'} /> </>
                }
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
                    {
                      page === 3 ? <> <ServicesIcon color="primary" /> </> : <> <ServicesIcon color="" /> </>
                    }
                  </ListItemIcon>
                  {
                    page === 3 ? <> <ListItemText primary={'Services'} /> </> : <> <ListItemText secondary={'Services'} /> </>
                  }
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
                      {
                        page === 3 ? <> <EduIcon fontSize="small" color="primary" /> </> : <> <EduIcon fontSize="small" color="" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 3 ? <> <ListItemText primary={'EAS Services'} /> </> : <> <ListItemText secondary={'EAS Services'} /> </>
                    }
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setEfaServicePage}>
                    <ListItemIcon>
                      {
                        page === 4 ? <> <MoneyIcon fontSize="small" color="primary" /> </> : <> <MoneyIcon fontSize="small" color="" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 4 ? <> <ListItemText primary={'EFA Services'} /> </> : <> <ListItemText secondary={'EFA Services'} /> </>
                    }
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setRmServicePage}>
                    <ListItemIcon>
                      {
                        page === 5 ? <> <PeopleIcon fontSize="small" color="primary" /> </> : <> <PeopleIcon fontSize="small" color="" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 5 ? <> <ListItemText primary={'RM Services'} /> </> : <> <ListItemText secondary={'RM Services'} /> </>
                    }
                  </StyledMenuItem>

                  <StyledMenuItem onClick={setLmServicePage}>
                    <ListItemIcon>
                      {
                        page === 6 ? <> <PersoIcon fontSize="small" color="primary" /> </> : <> <PersoIcon fontSize="small" color="" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 6 ? <> <ListItemText primary={'LM Services'} /> </> : <> <ListItemText secondary={'LM Services'} /> </>
                    }
                  </StyledMenuItem>
                  <StyledMenuItem onClick={setComptMgtPage}>
                    <ListItemIcon>
                      {
                        page === 11 ? <> <PeopleIcon fontSize="small" color="primary" /> </> : <> <PeopleIcon fontSize="small" color="" /> </>
                      }
                    </ListItemIcon>
                    {
                      page === 11 ? <> <ListItemText primary={'Competence Mgt Services'} /> </> : <> <ListItemText secondary={'Competence Mgt Services'} /> </>
                    }
                  </StyledMenuItem>

                </StyledMenu>
              </List>
            }
            {
              <ListItem button onClick={setExercisePage}>
                <ListItemIcon>
                  {
                    page === 7 ? <> <AssessmentIcon color="primary" /> </> : <> <AssessmentIcon color="" /> </>
                  }
                </ListItemIcon>
                {
                  page === 7 ? <> <ListItemText primary={'Exercises'} /> </> : <> <ListItemText secondary={'Exercises'} /> </>
                }
              </ListItem>
            }
          </List>
          <Divider />
          <List>
            {
              <ListItem button onClick={() => logout()}>
                <ListItemIcon><LogoutIcon color="p" />  </ListItemIcon>
                <ListItemText secondary={'Logout'} />
              </ListItem>
            }
          </List>
        </Drawer>
        <main className={classes.content}>

          {
            (page == 0) ? <Account /> : (page == 1) ? <Profile /> : (page == 2) ? <Subscription /> : (page == 3) ? <EASServicePage /> : (page == 4) ? <EFAServicePage /> : (page == 5) ? <RMServicePage /> : (page == 6) ? <LMServicePage /> : (page == 7) ? <Exercises setRmExercisePage={setRmExercisePage} /> : (page == 11) ? <CompetenceMgt /> : (page === 10) ? <QuestionComponent exercise={RMEx} /> : ""}
        </main>
      </div>
    </>
  );

}
