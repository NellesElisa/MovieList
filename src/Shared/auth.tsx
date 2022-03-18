import * as React from "react";

export const checkAuth = (login:string,password:string,go:()=> void) => {

    // Axios
    // .get('https://api-ri7.herokuapp.com/api/users/login', userLogged)
    // .then(res => console.log(res.data.token))
    // .catch(err => console.log('error happen =>', err))

    const isLogged = login == '' && password == '';
    if (isLogged)
    {
       go();
    }else{
        alert('error password or login');
    }
}