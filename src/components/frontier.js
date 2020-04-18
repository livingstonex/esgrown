import React, { Component } from "react";
import { AuthContext } from "../AuthContext";

import IndividualDashboard from "./individual_dashboard";
import CorporateDashboard from "./corporate_dashboard";
import AdminDashboard from './admin_dashboard';





export default class Frontier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    componentDidMount() {
        const u = JSON.parse(sessionStorage.getItem("key"));

        if (!(u.isLogged)) {
            window.location = "/"
        }
        console.log(u)
    }

    render() {
        return (
            <AuthContext.Consumer>
                {
                    (context) => (

                        (context.data.status == "corporate") ? <CorporateDashboard /> : (context.data.status == "ADMIN") ? <AdminDashboard /> : <IndividualDashboard />
                    )
                }
            </AuthContext.Consumer>

        );
    }
}





// class CorporateDashboard extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             org_name:'',
//             email:'',
//             phone:'',
//             country:'',
//             state:''
//         }
//     }

//     componentDidMount(){
//         const u = JSON.parse(sessionStorage.getItem("corp_key"));
//         if(!(u.isLogged)){
//             window.location = "/"
//         }
//         console.log(u)
//     }


//     render(){
//         return(
//             <AuthContext.Consumer>
//                 {
//                         (context) => (
//                             (context.c_data) ?
//                             <div>
//                                 Corporate Dashboard: {context.c_data.cname}
//                             </div>
//                             : window.location = "/"
//                         )
//                 }   
//             </AuthContext.Consumer>
//         );
//     }
// };




// class IndividualDashboard extends Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             fullname : '',
//         }
//     }

//     componentDidMount(){
//         const u = JSON.parse(sessionStorage.getItem("key"));
//         if(!(u.isLogged)){
//             window.location = "/"
//         }
//         console.log(u)
//     }

//     render(){
//         return(
//             <AuthContext.Consumer>
//                 {
//                         (context) => (
//                             (context.data) ?
//                             <div>
//                                 Individual Dashboard: {context.data.fullname}
//                             </div>
//                             : window.location = "/"
//                         )
//                 }   
//             </AuthContext.Consumer>

//         );
//     }
// }