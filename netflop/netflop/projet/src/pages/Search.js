import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

const Search = () => {
    let { query } = useParams();
    query = query.split('_').join(' ');
    const [movies, setMovies] = useState([]);

    async function getData() {
		const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}`);
		setMovies(res.data.results);
	}

    useEffect(() => {
		getData();
	}, []);

    if (movies.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="position-absolute start-50 top-50 translate-middle">
                    <h1 className="text-center text-light mb-5">Aucun résultat trouvé pour: {query}</h1>
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
                <h1 className="text-center text-light py-5">Résultats trouvés pour: {query}</h1>
                <div className="text-center mb-5">
                    <Link to={`/`}>
                        <button className="btn btn-outline-danger" type="submit">Retour</button>
                    </Link>
                </div>
                <div className="container text-center">
                    <div className="row">
                        {movies.map((movie) => {
                            return (
                                <div key={movie.id} className="col row-image text-decoration-none m-4">
                                    <Link to={`/movie/${movie.id}`}>
                                        <img style={{"border-radius": "5px"}} className="text-light" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={movie.title}></img>
                                    </Link>
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

export default Search;