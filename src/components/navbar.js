import React, {Component, useContext} from "react";
import {Link} from "react-router-dom";

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
                                      <nav class="navbar navbar-expand-lg navbar-light bg-light static-top ">
                                      <div class="container">
                                        <a class="navbar-brand" href="/">Esgrown</a>
                                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                              <span class="navbar-toggler-icon"></span>
                                            </button>
                                        <div class="collapse navbar-collapse" id="navbarResponsive">
                                          <ul class="navbar-nav ml-auto">
                                            <li class="nav-item ">
                                            </li>
                                            <li className="nav-item">
                                            {
                                              (this.state.isLogged == true)? "":<Link className="nav-link" to="/about">About</Link>
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