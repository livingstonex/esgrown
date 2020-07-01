import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
//import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
//snackbar
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

//Dialog Transitions
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

    //Email Transition
    const email_transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    //Gender Transition
    const gender_transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

    //Phone Transition
    const phone_transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

    //Country Transition
    const country_transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

    //State Transition
    const state_transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

    //Alert Funtion for the snackbar
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
    
export default function Profile() {
  useEffect(()=> {
    const userr = JSON.parse(sessionStorage.getItem("key"));
    setUser(userr);
  },[]);



  //states
    // state for user data
  const [user, setUser] = useState({});
    // states for form
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState(''); 
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  
  //Dialog states
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  //EMAIL dialog states
  const [open_email, setOpenEmail] = React.useState(false);

  const handleClickOpenEmail = () => {
    setOpenEmail(true);
  };

  const handleCloseEmail= () => {
    setOpenEmail(false);
  };
  
  //GENDER dialog states
  const [open_gender, setOpenGender] = React.useState(false);

  const handleClickOpenGender = () => {
    setOpenGender(true);
  };

  const handleCloseGender= () => {
    setOpenGender(false);
  };

  //PHONE dialog states
  const [open_phone, setOpenPhone] = React.useState(false);

  const handleClickOpenPhone = () => {
    setOpenGender(true);
  };

  const handleClosePhone= () => {
    setOpenPhone(false);
  };

  //Country dialog states
  const [open_country, setOpenCountry] = React.useState(false);

  const handleClickOpenCountry = () => {
    setOpenCountry(true);
  };

  const handleCloseCountry= () => {
    setOpenCountry(false);
  };

   //Country dialog states
   const [open_state, setOpenState] = React.useState(false);

   const handleClickOpenState = () => {
     setOpenState(true);
   };
 
   const handleCloseState= () => {
     setOpenState(false);
   };
  

const handleSubmitEmail = (e)=>{
  e.preventDefault();
  // const put_Data = {
  //   email: email,
  //   phone: phone,
  //   country: country,
  //   state: state
  // }

  const user_id =  user.id;
  axios.post(`http://172.31.25.52:5000/individuals/update/email/`+ user_id, {email: email})
        .then((res)=> {
          console.log('Email Update successful: ' + res.data);
          handleClickSnack();
      })
        .catch(err => {
          console.log('Error: ' + err );
          handleClickSnackFail();
        });
  handleCloseEmail(); 
}

const handleSubmitGender = (e)=>{
  e.preventDefault();

  const user_id =  user.id; 
  
  axios.post('http://172.31.25.52:5000/individuals/update/gender/' + user_id, {gender: gender})
        .then((res)=> {
          console.log('Gender Update successful: ' + res.data);
          handleClickSnack();
        })
        .catch(err => {
          console.log('Error: ' + err );
          handleClickSnackFail();
        });
  handleCloseGender(); 
}

const handleSubmitPhone = (e)=>{
  e.preventDefault();

  const user_id =  user.id;
  axios.post(`http://172.31.25.52:5000/individuals/update/phone/`+ user_id, {phone: phone})
        .then((res)=> {
          console.log('Phone Update successful: ' + res.data);
          handleClickSnack();
        })
        .catch(err => {
          console.log('Error: ' + err );
          handleClickSnackFail();
        });
  handleClosePhone(); 
}

const handleSubmitCountry = (e)=>{
  e.preventDefault();

  const user_id =  user.id;
  axios.post(`http://172.31.25.52:5000/individuals/update/country/`+ user_id, {country: country})
        .then((res)=> {console.log('Country Update successful: ' + res.data);
        handleClickSnack();
        })
        .catch(err => {
          console.log('Error: ' + err );
          handleClickSnackFail();
        });
  handleCloseCountry(); 
}

const handleSubmitState = (e)=>{
  e.preventDefault();

  const user_id =  user.id;
  axios.post(`http://172.31.25.52:5000/individuals/update/state/`+ user_id, {state: state})
        .then((res)=> {
          console.log('State Update successful: ' + res.data); 
          handleClickSnack();
        })
        .catch(err => {
          console.log('Error: ' + err );
          handleClickSnackFail();
        });
  handleCloseState(); 
}


    //Material Design classes definition and controlled accordion state handling
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
      //setExpanded(isExpanded ? panel : false);
    };

    //Material Design Snackbar settings for Success(state, )
    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClickSnack = () => {
      setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenSnack(false);
    };


    
    //Material Design Snackbar settings for Success(state, )
    const [openSnackFail, setOpenSnackFail] = React.useState(false);

  const handleClickSnackFail = () => {
    setOpenSnackFail(true);
  };

  const handleCloseSnackFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackFail(false);
  };

    return (
      <> 
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6" style={{}}>
                
                  <Avatar style={{'height':'150px', 'width':'150px', 'backgroundColor':'skyblue', 
                                  'opacity':'0.8', 'fontSize':'70px', 'fontFamily':'ariel'}}> 
                  </Avatar>
                  <div className="" style={{'marginLeft':'7%'}}>
                    <div style={{'fontFamily':'ariel', 'fontSize':'25px', 'fontStyle':'bold', }}>Profile</div>
                  </div>
                <br/>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                          <ExpansionPanelSummary
                            expandIcon={ <a></a> }
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography className={classes.heading}>Name:</Typography>
                            
                            <Typography className={classes.secondaryHeading}>{user.name}</Typography>  
                          </ExpansionPanelSummary>
                              {/* <Divider/>
                              <ExpansionPanelDetails>
                                <Typography>
                                  {user.name}
                                </Typography>
                              </ExpansionPanelDetails> */} 
                        </ExpansionPanel>

                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                          <ExpansionPanelSummary
                            expandIcon={<a onClick={handleClickOpenEmail} className="btn btn-info btn-sm" style={{'color':'white'}}>edit</a>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                          >
                            <Typography className={classes.heading}>Email:</Typography>
                            <Typography className={classes.secondaryHeading}>
                              {user.email}
                            </Typography> 
                          </ExpansionPanelSummary>
                        </ExpansionPanel>

                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                          <ExpansionPanelSummary
                            expandIcon={<a onClick={handleClickOpenGender} className="btn btn-info btn-sm" style={{'color':'white'}}>edit</a>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                          >
                            <Typography className={classes.heading}>Gender:</Typography>
                            <Typography className={classes.secondaryHeading}>
                            {user.gender}
                            </Typography> 
                          </ExpansionPanelSummary>
                        </ExpansionPanel>

                        <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                          <ExpansionPanelSummary
                            expandIcon={<a onClick={setOpenPhone} className="btn btn-info btn-sm" style={{'color':'white'}}>edit</a>}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                          >
                            <Typography className={classes.heading}>Phone Number:</Typography>
                            <Typography className={classes.secondaryHeading}>
                            {user.phone}
                            </Typography> 
                          </ExpansionPanelSummary>
                      </ExpansionPanel>

                      <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                          <ExpansionPanelSummary
                            expandIcon={<a onClick={handleClickOpenCountry} className="btn btn-info btn-sm" style={{'color':'white'}}>edit</a>}
                            aria-controls="panel5bh-content"
                            id="panel4bh-header"
                          >
                            <Typography className={classes.heading}>Country:</Typography>
                            <Typography className={classes.secondaryHeading}>
                            {user.country}
                            </Typography> 
                          </ExpansionPanelSummary>
                      </ExpansionPanel>

                      <ExpansionPanel expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                          <ExpansionPanelSummary
                            expandIcon={<a onClick={handleClickOpenState} className="btn btn-info btn-sm" style={{'color':'white'}}>edit</a>}
                            aria-controls="panel6bh-content"
                            id="panel6bh-header"
                          >
                            <Typography className={classes.heading}>State:</Typography>
                            <Typography className={classes.secondaryHeading}>
                            {user.state}
                            </Typography> 
                          </ExpansionPanelSummary>
                      </ExpansionPanel>
                      <br/>
                   
                   
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
          <div className="container">
                <div className="row">
                  <div className="col col-lg-3"></div>
                  <div className="col col-lg-6">
                  

              {/* DIALOGS FOR THE VARIOUS EDIT FIELDS */}
                  {/* Dialog for Email */}
                  <Dialog
                        open={open_email}
                        TransitionComponent={email_transition}
                        keepMounted
                        onClose={handleCloseEmail}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle id="alert-dialog-slide-title">{"Profile Update"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                          <form onSubmit= {handleSubmitEmail}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input className="form-control" type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={user.email}></input>
                                    </div>
                                  
                                    <button className="btn btn-primary" type="submit" >Save</button>
                                    <br/>
                                </form>
                          </DialogContentText>
                        </DialogContent>
      
                      </Dialog>

                  {/* Dialog for Gender */}
                  <Dialog
                        open={open_gender}
                        TransitionComponent={gender_transition}
                        keepMounted
                        onClose={handleCloseGender}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle id="alert-dialog-slide-title">{"Profile Update"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                          <form onSubmit= {handleSubmitGender}>
                                    <div className="form-group">
                                        <label>Gender:</label>
                                        <input className="form-control" type="text" onChange={(e) => setGender(e.target.value)} value={gender} placeholder={user.gender}></input>
                                    </div>
                                  
                                    <button className="btn btn-primary" type="submit" >Save</button>
                                    <br/>
                                </form>
                          </DialogContentText>
                        </DialogContent>
      
                      </Dialog>

                  {/* Dialog for Phone Number */}
                  <Dialog
                  open={open_phone}
                  TransitionComponent={phone_transition}
                  keepMounted
                  onClose={handleClosePhone}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">{"Profile Update"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    <form onSubmit= {handleSubmitPhone}>
                              <div className="form-group">
                                  <label>Phone:</label>
                                  <input className="form-control"  type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder={user.phone}></input>
                              </div>
                            
                              <button className="btn btn-primary" type="submit" >Save</button>
                              <br/>
                          </form>
                    </DialogContentText>
                  </DialogContent>

                </Dialog>

              {/* Dialog for Country */}
               <Dialog
                open={open_country}
                TransitionComponent={country_transition}
                keepMounted
                onClose={handleCloseCountry}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"Profile Update"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  <form onSubmit= {handleSubmitCountry}>
                            <div className="form-group">
                                <label>Country:</label>
                                <input className="form-control" type="text" onChange={(e)=> setCountry(e.target.value)} value={country} placeholder={user.country}></input>
                            </div>
                          
                            <button className="btn btn-primary" type="submit" >Save</button>
                            <br/>
                        </form>
                  </DialogContentText>
                </DialogContent>

              </Dialog>

               {/* Dialog for State */}
               <Dialog
                open={open_state}
                TransitionComponent={state_transition}
                keepMounted
                onClose={handleCloseState}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"Profile Update"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  <form onSubmit= {handleSubmitState}>
                            <div className="form-group">
                                <label>State:</label>
                                <input className="form-control" type="text" onChange={(e)=> setState(e.target.value)} value={state} placeholder={user.state}></input>
                            </div>
                          
                            <button className="btn btn-primary" type="submit" >Save</button>
                            <br/>
                        </form>
                  </DialogContentText>
                </DialogContent>

              </Dialog>

                  {/* Form Dialog */}
                      {/* <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle id="alert-dialog-slide-title">{"Profile Update"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                          <form onSubmit= {handleSubmit}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input className="form-control" type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={user.email}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input className="form-control"  type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Enter Phone..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Country:</label>
                                        <input className="form-control" type="text" onChange={(e)=> setCountry(e.target.value)} value={country} placeholder="Enter Country..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>State:</label>
                                        <input className="form-control" type="text" onChange={(e)=> setState(e.target.value)} value={state} placeholder="Enter State..."></input>
                                    </div>
                                  
                                    <button className="btn btn-primary" type="submit" >Save</button>
                                    <br/>
                                </form>
                          </DialogContentText>
                        </DialogContent>
                        {/* <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Disagree
                          </Button>
                          <Button onClick={handleClose} color="primary">
                            Agree
                          </Button>
                        </DialogActions> 
                      </Dialog> */}

                  {/* <form onSubmit= {handleSubmit}>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input className="form-control" type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Enter Phone..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Country:</label>
                                        <input className="form-control" type="text" onChange={(e)=> setCountry(e.target.value)} value={country} placeholder="Enter Country..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>State:</label>
                                        <input className="form-control" type="text" onChange={(e)=> setState(e.target.value)} value={state} placeholder="Enter State..."></input>
                                    </div>
                                  
                                    <button className="btn btn-primary" type="submit" >Update</button>
                                    <br/>
                                </form> */}
                  </div>
                  <div className="col col-lg-3"></div>
                </div>
              </div>
              <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                  Update Successful, You will view it on next login!
                </Alert>
              </Snackbar>

              <Snackbar open={openSnackFail} autoHideDuration={6000} onClose={handleCloseSnackFail}>
                <Alert onClose={handleCloseSnackFail} severity="error">
                  There was an Error! Pls try again
                </Alert>
              </Snackbar>
                </div>
      </>
    );
  }
  