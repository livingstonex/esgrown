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


//Dropdown import setup
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



import Exercises from '../../exercises/exercises';
import Services from '../../services/services';
import LMExercise from '../../exercises/lm/lm';
import RMExercise from '../../exercises/rm/rm';
import EASService from '../../services/eas/eas';
import EFAService from '../../services/efa/efa';
import LMService from '../../services/lm/lm';
import RMService from '../../services/rm/rm';







const AdminDashboard = () => {


    const drawerWidth = 230;

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
            whiteSpace: 'nowrap'
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

    const [eas, setEas] = useState(false)
    const [efa, setEfa] = useState(false)
    const [lm, setLm] = useState(false)
    const [rm, setRm] = useState(false)
    const [lmex, setLmex] = useState(false)
    const [rmex, setRmex] = useState(false)
    const [allex, setAllex] = useState(false)
    const [allsrv, setAllsrv] = useState(false)



    //page functions
    const setHomePage = () => {
        setPage(0)
    }
    const setEasPage = () => {
        setPage(1)
    }
    const setEfaPage = () => {
        setPage(2)
    }
    const setLmPage = () => {
        setPage(3)
    }
    const setRmPage = () => {
        setPage(4)
    }
    const setLmExPage = () => {
        setPage(5)
    }
    const setRmExPage = () => {
        setPage(6)
    }
    const setAllExPage = () => {
        setPage(7)
    }
    const setAllSrvPage = () => {
        setPage(8)
    }


    //get logged in user
    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setUser(admin)

        admin.privilege.map(pri => {
            if (pri == 'EAS') {
                setEas(true)
            } else if (pri == 'EFA') {
                setEfa(true);
            } else if (pri == 'LM') {
                setLm(true)
            } else if (pri == 'RM') {
                setRm(true)
            } else if (pri == 'LMExercise') {
                setLmex(true);
            } else if (pri == 'RMExercise') {
                setRmex(true)
            } else if (pri == 'AllServices') {
                setAllsrv(true);
            } else if (pri == 'AllExercises') {
                setAllex(true)
            }

        })

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
                            Welcome: Admin
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
                    <div className={classes.toolbar} style={{ marginLeft: '-10px'}}>
                        <div style={{ height: '100%', width: '25px', backgroundColor: '#3F51b5' }}></div>
                        <div style={{ marginLeft: '60px' }}>
                            <img src={logo} width="80%" alt="" />
                        </div>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List style={{ background: '#e9e9e9'}}>
                        <div style={{ marginLeft: '15px' }}><img src={avatar} alt="Avatar" style={{ width: "50%" }} /></div><br />
                    </List>
                    <Divider />

                    <List style={{ }}>
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

                        {eas ?
                            <ListItem button onClick={setEasPage}>
                                <ListItemIcon><AddBoxIcon color="primary" /> </ListItemIcon>
                                <ListItemText primary={'Create EAS service'} />
                            </ListItem>
                            : ""
                        }
                        {efa ?
                            <ListItem button onClick={setEfaPage}>
                                <ListItemIcon><UpdateIcon color="primary" /> </ListItemIcon>
                                <ListItemText primary={'Create EFA Service'} />
                            </ListItem>
                            : ""
                        }

                        {
                            rm
                                ?
                                <ListItem button onClick={setRmPage}>
                                    <ListItemIcon> <ExposureIcon color="primary" /> </ListItemIcon>
                                    <ListItemText primary={'Create RM Services'} />
                                </ListItem>
                                :
                                ""
                        }

                        {
                            lm
                                ?
                                <ListItem button onClick={setLmPage}>
                                    <ListItemIcon><RoomServiceIcon color="primary" /> </ListItemIcon>
                                    <ListItemText primary={'Create LM Service'} />
                                </ListItem>
                                :
                                ""
                        }
                        {
                            lmex
                                ?
                                <ListItem button onClick={setLmExPage}>
                                    <ListItemIcon><RoomServiceIcon color="primary" /> </ListItemIcon>
                                    <ListItemText primary={'Create LM Exercises'} />
                                </ListItem>
                                :
                                ""
                        }
                        {
                            rmex
                                ?
                                <ListItem button onClick={setRmExPage}>
                                    <ListItemIcon><RoomServiceIcon color="primary" /> </ListItemIcon>
                                    <ListItemText primary={'Create RM Exercises'} />
                                </ListItem>
                                :
                                ""
                        }
                        {
                            allex
                                ?
                                <ListItem button onClick={setAllExPage}>
                                    <ListItemIcon><RoomServiceIcon color="primary" /> </ListItemIcon>
                                    <ListItemText primary={'Create All Exercises'} />
                                </ListItem>
                                :
                                ""
                        }
                        {
                            allsrv
                                ?
                                <ListItem button onClick={setAllSrvPage}>
                                    <ListItemIcon><RoomServiceIcon color="primary" /> </ListItemIcon>
                                    <ListItemText primary={'Create All Services'} />
                                </ListItem>
                                :
                                ""
                        }

                    </List>
                    <Divider />
                    <List style={{ background: '#e9e9e9'}}>
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
                        (page == 0) ? "HOME" : (page == 1) ? <EASService /> : (page == 2) ? <EFAService /> : (page == 3) ? <LMService /> : (page == 4) ? <RMService /> : (page == 5) ? <LMExercise /> : (page == 6) ? <RMExercise /> : (page == 7) ? <Exercises /> : (page == 8) ? <Services /> : ""
                    }
                </main>
            </div>
        </>
    );
}

export default AdminDashboard;