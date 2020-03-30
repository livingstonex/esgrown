import React, {Component, useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import {AuthContext} from '../AuthContext';

export default class Logout extends Component{

  componentDidMount(){
    const u = JSON.parse(sessionStorage.getItem("key"));
    // console.log("heyyy")
  }
    render(){ 
        const GlobalUser = {
          isLogged: false,
          email: '',
          name: '',  
          phone: '',
          gender: '',
          dob: '',
          country: '',
          state: '', 
       };

      const Global_CorpUser = {
        isLogged: false,
        cname: '',
        cemail: '',                                   
        cphone: '',   
        cdoi: '',
        ccountry: '',
        cstate: '' 
      }
        return(
          <AuthContext.Consumer>
                    {
                        (context) => (
                            <div className="container">
                                <p>Logged Out</p>
                                {
                                  sessionStorage.setItem("key", JSON.stringify(GlobalUser)),
                                  sessionStorage.setItem("corp_key", JSON.stringify(Global_CorpUser)),

                                  localStorage.removeItem('notify'),
                                  window.location = "/"
                                 
                                }
                            </div>          
                    )}
          </AuthContext.Consumer>
        );
    }
}