// export default function(history){
//     sessionStorage.clear();
//     sessionStorage.removeItem('key');
//     sessionStorage.removeItem('corp_key');
//     // history.push('/');
//     window.location = '/';
// }

const logout = (history) => {
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
  
    sessionStorage.setItem("key", JSON.stringify(GlobalUser));
    sessionStorage.setItem("corp_key", JSON.stringify(Global_CorpUser));
    
    localStorage.clear();
    window.location = '/';
    console.log("logged out")
  }

  export { logout }
  