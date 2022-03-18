import * as React from 'react';
import TextInput from "../Shared/TextInput";
import Modal from "./Modal";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import IUser from '../Interfaces/IUser';

//styled-componements
const Container = styled.div`
display: flex;
  align-content: center;
  justify-content: center;
  color: black;
  margin-top: 10px;
`;

const Form = styled.div`
background: #B250A4;
    border-radius: 20px;
    border-left: 1px solid white;
    border-top: 1px solid white;
    backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding-top:10px;
    color:white;
`;

// code
const Register: React.FC = () => {

    let navigate = useNavigate();

    const [user, setUser] = React.useState<IUser>({
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        password: '',
        birth: '',
        biography: '',
        postalCode: '',
        avatar: '',
    });

    const [showModal, setShowModal] = React.useState(false);

    const [err, setErr] = React.useState<string | null>(null);


    const closeModal = () => setShowModal(false);
    const navigateToMovies = () => navigate('/movies');


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [key]: value })
    }

    const register = () => {
        console.log("user", user);
        Axios
            .post('https://api-ri7.herokuapp.com/api/users/register', user)
            .then(res => {
                if (res.status == 200) {
                    navigate('/')
                }
            })
            .catch(err => setErr('une erreur est survenue'))
    }

    return (
        <div>
            {showModal ?
                <Modal
                    data={user}
                    closeModal={closeModal}
                    validateModal={navigateToMovies}
                />
                :
                <div>
                    <Container>
                        <Form>
                            <h1>Register</h1>
                            <div>
                                <div style={{ display: "flex", flexDirection:"row"}}>
                                    <TextInput
                                        label='Homme'
                                        type='radio'
                                        value='homme'
                                        action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                        name='civility'
                                    />
                                    <TextInput
                                        label='Femme'
                                        type='radio'
                                        value='femme'
                                        action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                        name='civility'
                                    />
                                </div>
                                <TextInput
                                    label='Nom*'
                                    value={user.lastname}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='lastname'
                                    type='text'
                                />
                                <TextInput
                                    label='Prénom*'
                                    value={user.firstname}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='firstname'
                                    type='text'
                                />
                                <TextInput
                                    label='Email*'
                                    value={user.email}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='email'
                                    type='email'
                                />
                                <TextInput
                                    label='Mot de passe*'
                                    value={user.password != null ? user.password : ''}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='password'
                                    type='password'
                                />
                                <TextInput
                                    label='Date de naissance'
                                    value={user.birth}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='birth'
                                    type='date'
                                />
                                <TextInput
                                    label='Ville*'
                                    value={user.city}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='city'
                                    type='text'
                                />
                                <TextInput
                                    label='Code postal*'
                                    value={user.postalCode}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='postalCode'
                                    type='text'
                                />
                                <TextInput
                                    label='Biographie'
                                    value={user.biography}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='biography'
                                    type='text-area'
                                />
                                <TextInput
                                    label='Avatar'
                                    value={user.avatar}
                                    action={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    name='avatar'
                                    type='text'
                                />
                            </div>
                            <Button
                                label={"S'inscrire"}
                                click={register}
                                active={user.firstname.length > 0}
                            />
                            <Link className={'nav-link link-info'} to={'/'}>Vous possèdez déja un compte ?</Link>
                        </Form>
                    </Container>
                </div>
            }

        </div>

    );
};

export default Register;