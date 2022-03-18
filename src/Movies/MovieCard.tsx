import * as React from 'react';

interface CardProps {
    title: string;
    release_date: Date | string;
    poster_path: string;
    goToMovie: () => void;
    isCustom?: boolean
}

const MovieCard: React.FC<CardProps> = (props: CardProps) => {

    const imageDuFilm = props.poster_path;
    const imageURL = `https://image.tmdb.org/t/p/original/${imageDuFilm}`


    return (
        <div onClick={props.goToMovie}>
            <h2 className={'h6'}>{props.title}</h2>
            <div className={'list-item'}>
                <img src={props.isCustom ? props.poster_path : imageURL} style={{ width: 280 }} alt={props.title} />
            </div>
        </div>
    );
};

export default MovieCard;