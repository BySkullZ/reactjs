import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

const Favs = () => {
    const [movies, setMovies] = useState([]);

    async function getData() {
		const res = await axios.get(`http://localhost:3001/favs`);
		setMovies(res.data);
	}

    useEffect(() => {
		getData();
	}, []);

    console.log(movies);

    if (movies.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="position-absolute start-50 top-50 translate-middle">
                    <h1 className="text-center text-light mb-5">Aucune série ou film en favoris. Commencez à en mettre dès maintenant !</h1>
                    <div className="text-center mt-5">
                        <Link to={`/`}>
                            <button className="btn btn-outline-danger" type="submit">Retour</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <h1 className="text-center text-light py-5">Vos favoris</h1>
                <div className="text-center mb-5">
                    <Link to={`/`}>
                        <button className="btn btn-outline-danger" type="submit">Retour</button>
                    </Link>
                </div>
                <div className="container text-center text-light">
                    <div className="row">
                        {movies.map((movie) => {
                            return (
                                <div key={movie.id} className="col row-image text-decoration-none m-4">
                                    <Link to={`/movie/${movie.id}`}>
                                        <img className="text-light" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.image}`} alt={movie.title}></img>
                                    </Link>
                                    <h2>{movie.name}</h2>
                                </div>
                            );
                        })}
                    </div>
                    <br/>
                </div>
            </div>
        );
    }
}

export default Favs;