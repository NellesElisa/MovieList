import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register/Register";
import Header from "./Shared/Header";
import Login from "./Login/Login";
import Profile from './Profile/Profile';
import MovieDetail from "./Movies/MovieDetail";
import ContextProvider from './Context/ContextProvider';
import AddMovie from './Movies/AddMovie';
import ListMovies from './Movies/ListMovies';



const Router = () => {

    const [isAuth, setIsAuth] = React.useState(false);

    return (
        <BrowserRouter>
            <ContextProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/movies" element={<ListMovies isAuth={isAuth} />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/addMovie" element={<AddMovie />} />
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    );
};

export default Router;