import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

const Search = () => {
    let { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState("");
    const [fav, setFav] = useState(false);

    async function getData() {
		const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`);
        const favres = await axios.get("http://localhost:3001/favs");
        setMovie(res.data);

        const index = favres.data.findIndex(fav => Number(fav.id) === Number(id));
        if (index > -1) {
            setFav(true);
        }
	}

    useEffect(() => {
		getData();
	}, []);

    setTimeout(() => {
        let strGenres = movie.genres.map(genre => genre.name).join(', ')

        setGenres(strGenres);
    }, 100);

    function toggleFavorite() {
        if (fav === true) {
            axios.delete(`http://localhost:3001/favs/${movie.id}`);
            setFav(false);
        } else {
            axios.post(`http://localhost:3001/favs/`, {id: id, name: movie.title, image: movie.poster_path});
            setFav(true);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="text-light row w-75 mx-auto">
                <h1 className="text-center my-5">{movie.title}</h1>
                <div className="col">
                    <div className="text-center">
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`} alt={movie.title}></img>
                    </div>
                </div>
                <div className="col fs-4">
                    <div>
                        <h2>Synopsis:</h2>
                        <p className="fs-6">{movie.overview}</p>
                    </div>
                    <p>Date de sortie: {movie.release_date}</p>
                    <p>Genres: {genres}</p>
                    <p>Publié: {(movie.status === "Released" && "Oui") || "Non"}</p>
                    <div className="d-flex">
                        <p>Note:</p>
                        <div className="progress bg-dark w-75 mt-2 ms-2" style={{height: "1.5rem"}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{width: `${movie.vote_average*10}%`}}>{Math.round(movie.vote_average*100)/100}/10</div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <button onClick={toggleFavorite} className="btn fs-4 text-decoration-none text-light">{fav === true && "Retirer des favoris" || "Rajouter aux favoris"}</button>
                </div>
                <div className="text-center mt-5">
                    <Link to={`/`}>
                        <button className="btn btn-outline-danger" type="submit">Retour</button>
                    </Link>
                </div>
            </div>
        </div>
    );
    
}

export default Search;