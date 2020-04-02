import React, {Component} from 'react';

//First we will make a context
export const AuthContext = React.createContext();

//Then Create a provider Component
export class AuthProvider extends Component{
    state = {
        isLogged: false,
    }
    
    render(){  

        // localStorage.setItem("key", JSON.stringify(this.GlobalUser)); 
        // console.log(JSON.parse(localStorage.getItem("key")) );  
        const idv_data = JSON.parse(sessionStorage.getItem("key"));   
        const corp_data = JSON.parse(sessionStorage.getItem("corp_key"));
        const admin_data = JSON.parse(sessionStorage.getItem("admin"));                      
        return(
                <AuthContext.Provider value={{
                    state: this.state,
                    setUserAuthData: (isLogged) => {this.setState({
                        isLogged: isLogged,
                    })
                },
                    data: idv_data,
                    admin: admin_data
                   //c_data: corp_data
                }}> 
                    {this.props.children}
                </AuthContext.Provider>
        )
    }
}
