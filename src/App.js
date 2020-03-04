import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Home from "./components/home";
import SignIn from "./components/corporate_login";
import SignUp_Individual from "./components/signup_individual";
import SignUp_Corporate from "./components/signup_corporate";
import About from "./components/about";
import Services from "./components/services";

import Logout from "./components/logout";
import Frontier from "./components/frontier";

import {AuthProvider} from "./AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Route path="/" exact component={Home} />
        <Route path="/corporate_login" exact component={SignIn} />
        <Route path="/signup_individual" exact component={SignUp_Individual} />
        <Route path="/signup_corporate" exact component={SignUp_Corporate} />
        <Route path="/about" exact component={About} />
        <Route path="/services" exact component={Services} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/frontier" exact component={Frontier}/>
      </Router>
    </AuthProvider>
  );
}

export default App;
