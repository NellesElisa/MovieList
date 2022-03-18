import * as React from "react";
import './Login.css';
import TextInput from "../Shared/TextInput";
import Button from "../Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../Shared/auth";
import styled from 'styled-components';
import Axios from "axios";
import { GlobalContext, IContext } from "../Context/ContextProvider";
import { token } from "../Profile/Profile";

//styled component
const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  color: black;
  margin-top: 10%;
`;

const Form = styled.div`
    background: rgba(139, 7, 130, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding-top:10px;
    color:white;
`;

// Code du login

interface LoginProps {
    isAuth: boolean;
    setIsAuth: (state: boolean) => void;
}

export const config = 
{
    headers: 
    { 
        Authorization: `Bearer ${token}` 
    }
};


const Login: React.FC<LoginProps> = (props: LoginProps) => {

    let navigate = useNavigate();

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    const [err, setErr] = React.useState<string | null>(null);

    const [userLogged, setUserLogged] = React.useState({
        email: '',
        password: ''
    });

    const getMyProfile = () => {
        Axios
            .get('https://api-ri7.herokuapp.com/api/users/profile', config)
            .then(res => setStore({ ...store, user: res.data }))
            .catch(err => console.log(err))
    }


    const login = () => {
        console.log("userLogged", userLogged);
        Axios
            .post('https://api-ri7.herokuapp.com/api/users/login', userLogged)
            .then(res => {
                if (res.data?.token != null) {
                    const token = res.data.token;
                    sessionStorage.setItem('token', token);
                    props.setIsAuth(true);
                    getMyProfile();
                }
            })
            .catch(err => setErr('erreur'))
        //  props.setIsAuth(true);
        // checkAuth(userLogged.email, userLogged.password, valid);
    }

    const formIsNotEmpty = userLogged.email.length > 0 && userLogged.password.length > 0;

    React.useEffect(() => {
        if (props.isAuth && store.user != null) {
            navigate('/movies');
        }
    }, [props.isAuth,store.user])

    return (
        <div>
            <div>
                <Container>
                    <Form>
                        <h1>Login</h1>
                        <div>
                            <TextInput
                                label='Email'
                                type='email'
                                value={userLogged.email}
                                action={(e: React.ChangeEvent<HTMLInputElement>) => setUserLogged({ ...userLogged, email: e.target.value })}
                            />
                            <TextInput
                                label='Password'
                                type='password'
                                value={userLogged.password}
                                action={(e: React.ChangeEvent<HTMLInputElement>) => setUserLogged({ ...userLogged, password: e.target.value })}
                            />
                        </div>
                        <Button
                            label='Valider'
                            click={login}
                            active={formIsNotEmpty}
                        />
                        <Link className={'nav-link link-info'} to={'/register'}>S'inscrire</Link>
                    </Form>
                </Container>
            </div>
        </div>
    );
};
export default Login;