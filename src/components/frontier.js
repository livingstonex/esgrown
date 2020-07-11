import React, { Component } from "react";
import { AuthContext } from "../AuthContext";
import IndividualDashboard from "./individual_dashboard";
import CorporateDashboard from "./corporate_dashboard";
import AdminDashboard from './admin_dashboard';
import toast from '../util/toast';
import axios from 'axios';





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
        //make axios calls to all subscription end points and check for active ones
        // debugger

        if (u.sub_status_eas === 'active') {
            axios.get(`http://localhost:5000/api/subscriptioneas/getsubcode/${u.id}`)
                .then(subcode => {
                    if (subcode.data !== null) {
                        axios.get(`https://api.paystack.co/subscription/${subcode.data}`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
                            .then(res => {
                                axios.post(`http://localhost:5000/api/subscriptioneas/update/substatus/${u.id}`, { sub_status: res.data.data.status })
                                    .then(sub => console.log(sub.data)).catch(err => console.log(err))
                                let ls = JSON.parse(sessionStorage.getItem('key'));
                                ls.sub_status_eas = res.data.data.status;
                                sessionStorage.setItem('key', JSON.stringify(ls));
                            }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err));
        }

        if (u.sub_status_efa === 'active') {
            axios.get(`http://localhost:5000/api/subscriptionefa/getsubcode/${u.id}`)
                .then(subcode => {
                    if (subcode.data !== null) {
                        axios.get(`https://api.paystack.co/subscription/${u.id}`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
                            .then(res => {
                                console.log(res.data.data.status);
                                axios.post(`http://localhost:5000/api/subscriptionefa/update/substatus/${u.id}`, { sub_status: res.data.data.status })
                                    .then(sub => console.log(sub.data)).catch(err => console.log(err))
                                let ls = JSON.parse(sessionStorage.getItem('key'));
                                ls.sub_status_efa = res.data.data.status;
                                sessionStorage.setItem('key', JSON.stringify(ls));
                            })
                    }
                }).catch(err => console.log(err));
        }

        if (u.sub_status_rm === 'active') {
            //also check for subscriptin for the corp user ie make a call to corporatesubscriptions and check for rm
            axios.get(`http://localhost:5000/api/subscriptionrm/getsubcode/${u.id}`)
                .then(subcode => {
                    if (subcode.data !== null) {
                        axios.get(`https://api.paystack.co/subscription/${subcode.data}`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
                            .then(res => {
                                console.log(res.data.data.status);
                                axios.post(`http://localhost:5000/api/subscriptionrm/update/substatus/${u.id}`, { sub_status: res.data.data.status })
                                    .then(sub => console.log(sub.data)).catch(err => console.log(err))
                                let ls = JSON.parse(sessionStorage.getItem('key'));
                                ls.sub_status_rm = res.data.data.status;
                                sessionStorage.setItem('key', JSON.stringify(ls));
                            })
                    }
                }).catch(err => console.log(err));
        }

        if (u.sub_status_lm === 'active') {
            axios.get(`http://localhost:5000/api/subscriptionlm/getsubcode/${u.id}`)
                .then(subcode => {
                    if (subcode.data !== null) {
                        axios.get(`https://api.paystack.co/subscription/${subcode.data}`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
                            .then(res => {
                                console.log(res.data.data.status);
                                axios.post(`http://localhost:5000/api/subscriptionlm/update/substatus/${u.id}`, { sub_status: res.data.data.status })
                                    .then(sub => console.log(sub.data)).catch(err => console.log(err))
                                let ls = JSON.parse(sessionStorage.getItem('key'));
                                ls.sub_status_lm = res.data.data.status;
                                sessionStorage.setItem('key', JSON.stringify(ls));
                            })
                    }
                }).catch(err => console.log(err));
        }


        if (u.sub_status_compt_mgt === 'active') {
            axios.get(`http://localhost:5000/api/competence/management/getuser/${u.id}`)
                .then(res => {
                    if (res.data !== null) {
                        const today = Date.now();
                        const endDate = res.data.end_date;
                        if (today > endDate) {

                            let ls = JSON.parse(sessionStorage.getItem('key'));
                            ls.sub_status_compt_mgt = 'completed';
                            sessionStorage.setItem('key', JSON.stringify(ls));

                            axios.post(`http://localhost:5000/api/competence/management/update/substatus/${u.id}`, { sub_status: 'completed' })
                                .then(sta => console.log(sta.data))
                                .catch(err => console.log(err));

                            //update the individuals' doc
                            axios.post(`http://localhost:5000/api/individuals/update/substatus/${u.id}`, { sub_status_compt_mgt: 'completed' })
                                .then(() => console.log("updated")).catch(err => console.log(err))
                        }
                        console.log(res.data)
                    }
                }).catch(err => console.log(err))
        }

        if (u.sub_status_eas === 'completed') {
            toast('your Education Advisory Service subscription has expired. Please subscribe to continue to receive service', 'info')
        }
        if (u.sub_status_efa === 'completed') {
            toast('your Education Financial Advisory subscription has expired. Please subscribe to continue to receive service', 'info')
        }
        if (u.sub_status_rm === 'completed') {
            toast('your Recruitment Management subscription has expired. Please subscribe to continue to receive service', 'info')
        }
        if (u.sub_status_lm === 'completed') {
            toast('your Leadership Management subscription has expired. Please subscribe to continue to receive service', 'info')
        }
        if (u.sub_status_compt_mgt === 'completed') {
            toast('your Competence Management subscription has expired. Please inform your organization pay to continue to receive service', 'info')
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