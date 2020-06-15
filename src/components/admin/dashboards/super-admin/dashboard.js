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
import ServicesIcon from '@material-ui/icons/RoomService';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LogoutIcon from '@material-ui/icons/Lock';
import logo from '../../../../img/esgrown.png';
import avatar from '../../../../img/boy.svg';


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


import CreateAdmin from './components/create-country-admin';
import UpdatePrivileges from './components/update-privileges';
import Home from './components/home';
// Sub pages for home
import AllAdmins from './components/all-admin';
import Activities from './components/activity';






const SuperAdminDashboard = () => {


    const drawerWidth = 250;

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


    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setUser(admin)

    }, []);


    const setCreatePage = () => {
        setPage(1);
    }

    const setUpdatePage = () => {
        setPage(2);
    }
    const setHomePage = () => {
        setPage(0);
    }

    // Set state functions for Sub pages
    const setAdmins = () => {
        setPage(3);
    }
    const setActivityPage = () => {
        setPage(4);
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
                    <div className={classes.toolbar} style={{ marginLeft: '-10px' }}>
                        <div style={{ height: '100%', width: '25px', backgroundColor: '#3F51b5' }}></div>
                        {/* Place Logo here */}
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
                                    <SvgIcon color="primary">
                                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                    </SvgIcon>
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        }

                        {
                            <ListItem button onClick={setCreatePage}>
                                <ListItemIcon><AssessmentIcon color="primary" /> </ListItemIcon>
                                <ListItemText primary={'Create Country Admin'} style={{ fontSize: '12px', textAlign: 'center' }} />
                            </ListItem>
                        }
                        {
                            <ListItem button onClick={setUpdatePage}>
                                <ListItemIcon><EduIcon color="primary" /> </ListItemIcon>
                                <ListItemText primary={'Update Privileges'} />
                            </ListItem>
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
                <main className={classes.content} style={{ background: "#D0CFCF", height: '800px' }}>

                    {
                        (page === 0) ? <Home admin={setAdmins} activity={setActivityPage}/> : (page === 1) ? <CreateAdmin /> : (page === 2) ? <UpdatePrivileges /> : (page === 3) ? <AllAdmins /> : (page === 4) ? <Activities /> : ""
                    }
                </main>
            </div>
        </>
    );
}

export default SuperAdminDashboard;