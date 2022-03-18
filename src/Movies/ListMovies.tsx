import * as React from 'react';
import MovieCard from "./MovieCard";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext, IContext } from '../Context/ContextProvider';
import { IMovie } from '../Interfaces/IMovie';
import Button from '../Shared/Button';
import { config } from '../Login/Login';
import { Container } from 'reactstrap';

type ListProps = {
    isAuth: boolean;
}

//   type Action =
//     | { type: 'add_todo'; id: number; text: string }
//     | { type: 'toggle_todo'; id: number }

//     const reducer = (state: IStore, action: Action): State => {

//     }

const ListMovies: React.FC<ListProps> = ({ isAuth }: ListProps) => {

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    const [moviesRI7, setMoviesRI7] = React.useState<null | []>(null);

    const [showRI7movies, setShowRI7movies] = React.useState<boolean>(false);
    const [showDBmovies, setShowDBmovies] = React.useState<boolean>(true);

    // const[state,dispatch] =React.useReducer(reducer,store);

    let navigate = useNavigate();

    const [err, setErr] = React.useState("");

    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6ec0c583a463914abc29b979b636ab80`;

    const getMovies = () => {
        Axios
            .get(URL)
            .then(res => setStore({ ...store, movies: res.data.results }))
            .catch(err => setErr(err))
    };

    const getMoviesFromRI7 = () => {
        Axios
            .get('https://api-ri7.herokuapp.com/api/movies', config)
            .then(res => setMoviesRI7(res.data))
            .catch(err => setErr(err))
    };

    const goToMovie = (movie: IMovie) => {
        navigate(`/movies/${movie.id}`);
    };

    const deleteMovie = (movieIdToDelete: number) => {
        const updatedMovies = store.movies?.filter(movie => movie.id != movieIdToDelete);
        if (updatedMovies != null) {
            setStore({ ...store, movies: updatedMovies })
        }
    };

    const toggleChange = () => {
        if (!showDBmovies) {
            setShowDBmovies(true);
            setShowRI7movies(false);
        }
        if (!showRI7movies) {
            setShowDBmovies(false);
            setShowRI7movies(true);
        }
    }

    const displayMovies = () => {
        if (store.movies != null) {
            if (showRI7movies) {
                const onlyRI7movies: IMovie[] | [] = store.movies?.filter(movie => movie.isCustom);
                return onlyRI7movies.map((movie: IMovie, index: number) =>
                    <div key={movie.id}>
                        <Button
                            label='X'
                            active={true}
                            click={() => deleteMovie(movie.id)}
                        />
                        <MovieCard
                            {...movie}
                            goToMovie={() => goToMovie(movie)}
                            isCustom={movie.isCustom != null}
                        />
                    </div>
                )
            }
            if (showDBmovies) {
                const onlyMDBmovies: IMovie[] | [] = store.movies?.filter(movie => !movie.isCustom);
                return onlyMDBmovies.map((movie: IMovie, index: number) =>
                    <div key={movie.id}>
                        <Button
                            label='X'
                            active={true}
                            click={() => deleteMovie(movie.id)}
                        />
                         <MovieCard
                            {...movie}
                            goToMovie={() => goToMovie(movie)}
                            isCustom={movie.isCustom != null}
                        />
                    </div>
                )
            }
            else {
                return store.movies.map((movie: IMovie, index: number) =>
                    <div key={movie.id}>
                        <Button
                            label='X'
                            active={true}
                            click={() => deleteMovie(movie.id)}
                        />
                         <MovieCard
                            {...movie}
                            goToMovie={() => goToMovie(movie)}
                            isCustom={movie.isCustom != null}
                        />
                    </div>
                )
            }
        }
    };

    React.useEffect(() => {
        if (isAuth) {
            getMoviesFromRI7();
            getMovies();
        }
        else {
            navigate('/');
        }
    }, []);

    React.useEffect(() => {
        if (moviesRI7 != null && store.movies != null) {
            const tempArray = [...store.movies];
            moviesRI7.map(movie => tempArray.push(movie));
            setStore({ ...store, movies: tempArray });
        }
    }, [moviesRI7]);


    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Button
                    label='Film RI7'
                    active={true}
                    click={toggleChange} />

                <Button
                    label='Film movie database'
                    active={true}
                    click={toggleChange} />
            </div>
            <div className={'layout-posters'}>
                {store.movies != null ?
                    displayMovies()
                    :
                    <p>Films en cours de chargement...</p>
                }
            </div>
        </div >
    );
};

export default ListMovies;