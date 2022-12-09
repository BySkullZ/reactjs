import React, { useState } from "react";
import {Link} from "react-router-dom"
import { Search } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const Navbar = ({title, type}) => {
	const [navBlack, setNavBlack] = useState(false);
    const [query, setQuery] = useState("");

    const transitionNav = () => {
        window.scrollY > 100 ? setNavBlack(true) : setNavBlack(false);
    }

	useState(() => {
		document.addEventListener("scroll", transitionNav);
	});

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
		<div>
			<nav className={`navbar ${navBlack && "bg-black"} navbar-expand-lg navbar-bg position-fixed w-100`}>
                <div className="container-fluid">
                    <h1 className="title me-4">NETFLOP</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="text-decoration-none" to={`/`}>
                                <p className="nav-link text-light active text-shadow mb-1 mt-1" aria-current="page">Accueil</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-decoration-none" to={`/favorites/`}>
                                <p className="nav-link text-light text-shadow mb-1 mt-1">Mes favoris</p>
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input onChange={handleChange} className="form-control me-3 bg-dark text-light border border-dark" type="search" placeholder="Rechercher un film" aria-label="Search"/>
                        <Link to={`/search/${query.split(' ').join('_')}`} onClick={() => setTimeout(() => {window.location.reload()}, 10)}>
                            <div className="mt-1">
                                <Search color="white" size={"30px"}/>
                            </div>
                        </Link>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar