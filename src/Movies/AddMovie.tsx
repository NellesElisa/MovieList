import Axios from 'axios';
import * as React from 'react';
import { GlobalContext, IContext } from '../Context/ContextProvider';
import { IMovie } from '../Interfaces/IMovie';
import { config } from '../Login/Login';
import TextInput from '../Shared/TextInput';
import styled from 'styled-components';
import Button from '../Shared/Button';

interface ContainerProps {
    light: boolean;
}

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 30px;
`;

const Body = styled.div<ContainerProps>`
    display: flex;
    padding:20px;
    flex-direction:column;
    border:solid white;
    border-radius: 30px;
    background-color: ${props => props.light ? 'rgba(99,90,224,0.5)' : '#49439e'};
`;

const AddMovie = () => {

    const [err, setErr] = React.useState("");

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    const [newMovies, setNewMovie] = React.useState({
        title: '',
        overview: '',
        release_date: '',
        poster_path: '',
    });

    const saveMovie = () => {
        console.log('save');
        Axios
            .post('https://api-ri7.herokuapp.com/api/movies', newMovies, config)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setNewMovie({ ...newMovies, [key]: value }
        )
    }

    return (
        <div>
            <Container>
                <Body light={store.theme == 'light'} >
                    <TextInput
                        label='Titre'
                        value={newMovies.title}
                        action={handleChange}
                        name='titre'
                        type='text'
                    />
                    <TextInput
                        label='Description'
                        value={newMovies.overview}
                        action={handleChange}
                        name='overview'
                        type='text'
                    />
                    <TextInput
                        label='Date de sortie'
                        value={newMovies.release_date}
                        action={handleChange}
                        name='release_date'
                        type='date'
                    />
                    <TextInput
                        label='Image'
                        value={newMovies.poster_path}
                        action={handleChange}
                        name='poster_path'
                        type='text'
                    />
                </Body>
            </Container>
            <Button
                label='Enregistrer'
                active={true}
                click={saveMovie}
            />
        </div>
    )
};

export default AddMovie;