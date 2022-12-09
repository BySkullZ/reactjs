import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const Row = ({title, fetchUrl}) => {
	const [movies, setMovies] = useState([]);

	async function getData() {
		const res = await axios.get(`${fetchUrl}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
		setMovies(res.data.results);
	}

	useEffect(() => {
		getData();
	}, []);
	
    return (
		<div>
			<h2 className="text-light my-4 ms-3">{title}</h2>
			<div className="ms-3 ogrow text-center text-light">
				{movies.map((movie, index) => {
					return (
						<div key={movie.id} className="me-3 my-3 row-image">
							<Link className="text-light text-decoration-none" to={`/movie/${movie.id}`}>
								<img style={{"border-radius": "5px"}} src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="..."></img>
							</Link>
						</div>
						);
					})}
			</div>
		</div>
    )
}

export default Row