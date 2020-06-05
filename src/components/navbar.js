import React, {Component, useContext} from "react";
import {Link} from "react-router-dom";
import logo from "../img/esgrown.png";
import {Image} from 'react-bootstrap';

import {AuthContext} from '../AuthContext'

export default class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLogged: false,
      isLogged_I: false,
      name: '',
      status: '',
      //Corporate auth params
      isLogged_C: false,
      org_name: ''
    }
  }

  componentDidMount(){
    const i = JSON.parse(sessionStorage.getItem("key"));
    const c = JSON.parse(sessionStorage.getItem("corp_key"));

    console.log(i);
    // console.log(c);

    if(i){
      this.setState({
        isLogged: i.isLogged,
        isLogged_I: i.isLogged,
        name: i.name,
        status: i.status
      });
    }else{
      this.setState({
        isLogged: false,
        isLogged_I:false
      })
    }

    //Check for Corporate User
    if(c){
      this.setState({
        isLogged_C: c.isLogged,
        org_name: c.cname
      });
    }else{
      this.setState({
        isLogged_C:false
      })
    }

  }
    render(){  
        return(
          <AuthContext.Consumer>
                    {
                        (context) => (
                          // navbar-light bg-light static-top
                                      <nav class="navbar navbar-expand-lg" style={{background:'transparent'}}>
                                      <div class="container">
                                        <div class="d-flex justify-content-center align-items-center" style={{backgroundColor:'', borderRadius:'50%', width:'70px', height:'70px',}}>
                                          <img src={logo}  height="65"/>
                                        </div>
                                        {/* <a class="navbar-brand" style={{backgroundColor:'white', borderRadius:'50%'}} href="/"><img src={logo} width="60%"/></a> */}
                                        {/* <Image src={logo}  width="70" height="70"/> */}
                                        {/* <p style={{color:'red'}}>Esgrown</p> */}
                                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                              <span class="navbar-toggler-icon"></span>
                                            </button>
                                        <div class="collapse navbar-collapse" id="navbarResponsive">
                                          <ul class="navbar-nav ml-auto">
                                            <li class="nav-item ">
                                            </li>
                                            <li className="nav-item">
                                            {
                                              // (this.state.isLogged == true)? "":<Link className="nav-link" to="/about">About</Link>
                                            }                                      
                                            </li>                                         
                                            <li class="nav-item">
                                            {
                                              (this.state.isLogged == true)?<Link className="nav-link" to="/logout">Logout</Link>:''
                                            }
                                            </li>
                                            <li class="nav-item">
                                            {
                                              (this.state.isLogged_C == true)?<Link className="nav-link" to="/logout">Logout</Link>:''
                                            }
                                            </li>
                                            <li class="nav-item">
                                             
                                                {
                                                  (this.state.isLogged == true)? <Link to="/frontier" className="nav-link"> Welcome: {this.state.name}</Link> : ''
                                                }
                                              
                                            </li>
                                            <li class="nav-item">
                                              <Link className="nav-link">
                                                {
                                                  (this.state.isLogged_C == true)? `Welcome: ${this.state.org_name}` : ''
                                                }
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </nav>
                    )}
          </AuthContext.Consumer>
        );
    }
}