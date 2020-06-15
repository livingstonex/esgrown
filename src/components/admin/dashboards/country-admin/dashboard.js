import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExposureIcon from '@material-ui/icons/Exposure';
import UpdateIcon from '@material-ui/icons/Update';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LogoutIcon from '@material-ui/icons/Lock';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import logo from '../../../../img/esgrown.png';
import avatar from '../../../../img/boy.svg';
import HomeIcon from '@material-ui/icons/Home';


//Dropdown import setup
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import CreateAdmin from './components/create-admin';
import UpdateAdminPrivilege from './components/update-privileges';
import Exercises from '../../exercises/exercises';
import Services from '../../services/services';
import Home from './components/home';
// Sub Pages for Home
import AllAdmins from './components/all-admins';
import Activities from './components/activity';





const CountryAdminDashboard = () => {


    const drawerWidth = 260;

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
            background: '#e9e9e9'
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
            background: '#e9e9e9'
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

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState({});
    const [page, setPage] = useState(0);
    const [exercise, setExercise] = useState(false);
    const [services, setServices] = useState(false);



    //page functions
    const setHomePage = () => {
        setPage(0)
    }
    const setCreateAdminPage = () => {
        setPage(1)
    }
    const setUpdatePage = () => {
        setPage(2)
    }
    const setServicePage = () => {
        setPage(3)
    }
    const setExercisePage = () => {
        setPage(4)
    }

    // Sub Pages
    const setAdmins = () => {
        setPage(5);
    }
    const setActivityPage = () => {
        setPage(6);
    }


    //get logged in user
    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setUser(admin)

        if (admin.privilege.length > 1) {
            setServices(true);
            setExercise(true);
        } else {
            if (admin.privilege == 'exercise') {
                setExercise(true);
            } else {
                setServices(true);

            }
        }

    }, []);



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
                    <Toolbar >
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
                            Welcome: {user.role} {" "} {user.name}
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
                    <div className={classes.toolbar} style={{ marginLeft: '-60px' }}>
                        <div style={{ height: '100%', width: '30px', backgroundColor: '#3F51b5' }}></div>

                        <div style={{ marginLeft: '60px' }}>
                            <img src={logo} width="60%" alt="" />
                        </div>

                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>

                        <div className="d-flex justify-content-center mt-4">
                            <img src={avatar} alt="Avatar" style={{ width: "30%" }} />
                        </div>
                        <br />
                        {
                            <ListItem button onClick={setHomePage}>
                                <ListItemIcon>
                                    {
                                        page === 0 ? <> <HomeIcon color="primary" /> </> : <> <HomeIcon color=""/> </>
                                    }
                                </ListItemIcon>
                                    {
                                        page === 0 ? <> <ListItemText primary={'Home'}/> </> : <> <ListItemText secondary={'Home'}/> </>
                                    }
                            </ListItem>
                        }

                        {
                            <ListItem button onClick={setCreateAdminPage}>
                                <ListItemIcon>
                                    {
                                        page === 1 ? <> <AddBoxIcon color="primary"/> </> : <> <AddBoxIcon color="" /> </>
                                    }
                                </ListItemIcon>
                                    {
                                        page === 1 ? <> <ListItemText primary={'Create Admin'} /> </> : <> <ListItemText secondary={'Create Admine'}/> </>
                                    }
                            </ListItem>
                        }
                        {
                            <ListItem button onClick={setUpdatePage}>
                                <ListItemIcon>
                                    {
                                        page === 2 ? <> <UpdateIcon color="primary" /> </> : <> <UpdateIcon color=""/> </>
                                    }
                                </ListItemIcon>
                                    {
                                        page === 2 ? <> <ListItemText primary={'Update Admin Privileges'} /> </> : <> <ListItemText secondary={'Update Admin Privileges'}/> </>
                                    }
                            </ListItem>
                        }

                        {
                            exercise
                                ?
                                <ListItem button onClick={setExercisePage}>
                                    {/* <ListItemIcon> <ExposureIcon color="primary" /> </ListItemIcon> */}
                                    <ListItemIcon> 
                                        {
                                            page === 3 ? <> <ExposureIcon color="primary" /> </> : <> <ExposureIcon color=""/> </>
                                        }
                                    </ListItemIcon>
                                    {/* <ListItemText primary={'Create Exercises'} /> */}
                                        {
                                            page === 3 ? <> <ListItemText primary={'Create Exercises'} /> </> : <> <ListItemText secondary={'Create Exercises'}/> </>
                                        }
                                </ListItem>
                                :
                                ""
                        }

                        {
                            services
                                ?
                                <ListItem button onClick={setServicePage}>
                                    {/* <ListItemIcon><RoomServiceIcon color="primary" /> </ListItemIcon> */}
                                    <ListItemIcon>
                                        {
                                            page === 3 ? <> <RoomServiceIcon color="primary"/> </> : <> <RoomServiceIcon color=""/> </>
                                        }
                                    </ListItemIcon>
                                    {/* <ListItemText primary={'Create Services'} /> */}
                                        {
                                            page === 3 ? <> <ListItemText primary={'Create Services'} /> </> : <> <ListItemText secondary={'Create Services'}/> </>
                                        }
                                </ListItem>
                                :
                                ""
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
                <main className={classes.content} style={{ background: "#D0CFCF", height: 'auto' }}>

                    {
                        (page === 0) ? <Home admin={setAdmins} activities={setActivityPage} /> : (page === 1) ? <CreateAdmin /> : (page === 2) ? <UpdateAdminPrivilege /> : (page == 3) ? <Services role={user.role}/> : (page == 4) ? <Exercises /> : (page == 5) ? <AllAdmins /> : (page == 6) ? <Activities /> : ""
                    }
                </main>
            </div>
        </>
    );
}

export default CountryAdminDashboard;