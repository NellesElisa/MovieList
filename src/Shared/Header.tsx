import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { GlobalContext, IContext } from '../Context/ContextProvider';
import Axios from 'axios';
import token from '../Profile/Profile';
import IUser from '../Interfaces/IUser';
import But from './Button2';

const Logo = styled.h1`
    font-weight: 100;
    margin: 15px;
`

const Header = () => {

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    const [user, setUser] = React.useState<IUser | null>(null);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const getMyProfile = () => {
        Axios
            .get('https://api-ri7.herokuapp.com/api/users/profile', config)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }


    const changeTheme = () => {
        setStore({ ...store, theme: 'dark' });
    }

    React.useEffect(() => {
        console.log('useEffect Profile')
        getMyProfile();
    }, [])


    return (
        <div>
            <nav className={'nav navbar-collapse bg-dark'}>
                <Link className={'nav-link link-light'} to={'/movies'}>
                    <Logo><FontAwesomeIcon icon={faStarHalfStroke} />MovieStar</Logo></Link>
                {store.user != null ?
                    <>
                        <p className='m-1'>Salut {store.user?.firstname}</p>
                        <div>
                            <ul className="nav nav-item">
                                <Link className={'nav-link link-light'} to={'/movies'}>Films</Link>
                                <Link className={'nav-link link-light'} to={'/profile'}>Mon profil</Link>
                                <Link className={'nav-link link-light'} to={'/addMovie'}>Ajouter un film</Link>
                                <But
                                    label={store.theme}
                                    active={true}
                                    click={changeTheme}
                                />
                            </ul>
                        </div>
                    </>
                    :
                    <ul className="nav nav-item">
                        <Link className={'nav-link link-light'} to={'/register'}>Inscription</Link>
                        <Link className={'nav-link link-light'} to={'/'}>Connexion</Link>
                        <But
                            label={store.theme}
                            active={true}
                            click={changeTheme}
                        />
                    </ul>
                }
            </nav>
        </div>
    );
};

export default Header;