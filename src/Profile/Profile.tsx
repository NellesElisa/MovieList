import * as React from 'react'
import Axios from 'axios';
import Button from '../Shared/Button';
import { Hearts } from 'react-loader-spinner';
import styled from 'styled-components';
import TextInput from '../Shared/TextInput';
import { GlobalContext, IContext } from '../Context/ContextProvider';

interface ContainerProps {
    light: boolean;
}

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 10px;
`;

const Body = styled.div<ContainerProps>`
border:solid white;
border-radius: 30px;
background-color: ${props => props.light ? 'rgba(99,90,224,0.5)' : '#49439e'};
padding:30px;
`;

const Img = styled.div`
margin-bottom: 30px;
`;

export const token = sessionStorage.getItem('token');

const Profile = () => {

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);


    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const updateProfile = () => {
        if (isUpdating) {
            Axios
                .put('https://api-ri7.herokuapp.com/api/users/profile', store.user, config)
            // .then(res => setUser(res.data))
            // .catch(err => console.log(err))

        }
        setIsUpdating(!isUpdating);
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (store.user != null) {
            const key = event.target.name;
            const value = event.target.value;
            setStore({ ...store, user: 
            {...store.user, [key] : value }
            })
        }
    }


    return (
        <div>
            {store.user != null ?
                <>
                    <Container>
                        <Body light={store.theme == 'light'}>
                            {isUpdating ?
                                <>
                                    <TextInput
                                        label='Nom'
                                        value={store.user.lastname}
                                        action={handleChange}
                                        name='lastname'
                                        type='text'
                                    />
                                    <TextInput
                                        label='Prénom'
                                        value={store.user.firstname}
                                        action={handleChange}
                                        name='firstname'
                                        type='text'
                                    />
                                    <TextInput
                                        label='Email'
                                        value={store.user.email}
                                        action={handleChange}
                                        name='email'
                                        type='email'
                                    />
                                    <TextInput
                                        label='Ville'
                                        value={store.user.city}
                                        action={handleChange}
                                        name='city'
                                        type='text'
                                    />
                                    <TextInput
                                        label='Date de naissance'
                                        value={store.user.birth}
                                        action={handleChange}
                                        name='birth'
                                        type='date'
                                    />
                                    <TextInput
                                        label='Code postal'
                                        value={store.user.postalCode}
                                        action={handleChange}
                                        name='postal'
                                        type='text'
                                    />
                                    <TextInput
                                        label='Bio'
                                        value={store.user.biography}
                                        action={handleChange}
                                        name='biography'
                                        type='text-area'
                                    />
                                    <TextInput
                                        label='Photo'
                                        value={store.user.avatar}
                                        action={handleChange}
                                        name='avatar'
                                        type='text'
                                    />
                                </>
                                :
                                <div>
                                    <h1>Mon profil</h1>
                                    <Img>
                                        <img
                                            className='profil'
                                            src={store.user.avatar}
                                            width={300}
                                            alt='image'
                                        />
                                    </Img>
                                    <p>Nom : {store.user.lastname}</p>
                                    <p>Prénom :  {store.user.firstname}</p>
                                    <p>Ville : {store.user.city}</p>
                                    <p>Age : {store.user.birth}</p>
                                    <p>Code postal : {store.user.postalCode}</p>
                                    <p>Bio : {store.user.biography}</p>
                                    <p>Email :  {store.user.email}</p>
                                </div>

                            }
                        </Body>
                    </Container>
                    <Button
                        label={isUpdating ? 'Enregistrer' : 'Modifier'}
                        active={true}
                        click={updateProfile}
                    />
                </>
                :
                <Hearts color="#00BFFF" height={80} width={80} />
            }
        </div>
    )
}

export default Profile