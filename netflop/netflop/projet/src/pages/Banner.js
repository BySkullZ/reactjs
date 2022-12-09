import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const Banner = ({title, type}) => {
	const [randomMovie, setRandomMovie] = useState([]);
	const [gradientBlack, setGradientBlack] = useState(false);

    const transitionGradient = () => {
        window.scrollY > 100 ? setGradientBlack(true) : setGradientBlack(false);
    }

	async function getData() {
		const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
		const randomNumber = Math.floor(
			Math.random() * res.data.results.length - 1
		);
		setRandomMovie(res.data.results[randomNumber]);
		return res;
	}

	useEffect(() => {
		getData();
	}, []);
  
	return (
		<header
			className={`banner bg-dark ${gradientBlack && "gradient-black"}`}
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}")`,
				backgroundPosition: "center center"}}
		>
			<div className="text-light text-shadow m-5">
				<h1 className="fw-bold">{randomMovie.title}</h1>
				<p className="fs-6 w-25">{randomMovie.overview}...</p>
				<Link to={`/movie/${randomMovie.id}`}>
					<button className="btn btn-secondary" type="submit">Plus d'infos</button>
				</Link>
			</div>
		</header>
	)
}

export default Banner;